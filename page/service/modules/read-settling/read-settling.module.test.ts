import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  bytes,
  scratch as landings,
  repoWith,
  rowsIn,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { startedAt } from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { LOCK_AT } from "akasha/git/modules/holding/holding.module.code.ts"
import {
  apartFor,
  checkoutChanging,
  landedApart,
  landingApart,
  landingsKeptApart,
  left,
  settledApart,
  unheldSaid,
} from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
  landings.sweep()
})

function checkout(): string {
  const root = scratch.rootFor("akasha-read-settling-")
  mkdirSync(join(root, ".git"), { recursive: true })
  return root
}

function held(root: string): string {
  const at = join(root, LOCK_AT)
  writeFileSync(at, `${process.pid} ${startedAt(process.pid)}`)
  return at
}

test("a read no landing holds is answered at once, and leaves no mark of reading", async () => {
  const apart = apartFor(2)
  const said = await settledApart(checkout(), apart, 1, () => {
    expect(Atomics.load(apart, 2)).toBe(1)
    return "read"
  })
  expect(said).toEqual({ settled: "read" })
  expect([...apart]).toEqual([0, 0, 0])
})

test("a read waits for a landing's hold on the checkout to go before it starts", async () => {
  const root = checkout()
  const at = held(root)
  setTimeout(() => rmSync(at, { force: true }), 100)
  let heldAtStart = true
  const said = await settledApart(root, apartFor(1), 0, () => {
    heldAtStart = existsSync(at)
    return "read"
  })
  expect(said).toEqual({ settled: "read" })
  expect(heldAtStart).toBe(false)
})

test("a hold kept past the wait is refused rather than read through", async () => {
  const root = checkout()
  const at = held(root)
  let ran = false
  const said = await settledApart(
    root,
    apartFor(1),
    0,
    () => {
      ran = true
      return "read"
    },
    50
  )
  rmSync(at, { force: true })
  expect(said).toEqual({ refused: unheldSaid(50) })
  expect(ran).toBe(false)
})

test("a landing the service makes waits for the read a thread is answering", async () => {
  const apart = apartFor(2)
  Atomics.store(apart, 2, 1)
  let landed = false
  const waiting = landedApart(apart, async () => {
    expect(Atomics.load(apart, 0)).toBe(1)
    landed = true
    return "landed"
  })
  await Bun.sleep(30)
  expect(landed).toBe(false)
  left(apart, 1)
  expect(await waiting).toBe("landed")
  expect(Atomics.load(apart, 0)).toBe(0)
})

test("a landing waits for reads no longer than its wait, then goes ahead", async () => {
  const apart = apartFor(1)
  Atomics.store(apart, 1, 1)
  expect(await landedApart(apart, async () => "landed", 20)).toBe("landed")
  expect(Atomics.load(apart, 0)).toBe(0)
})

const SETTLING_AT = new URL("./read-settling.module.code.ts", import.meta.url).pathname

const READER = [
  `const { settledApart } = await import(${JSON.stringify(SETTLING_AT)})`,
  "self.onmessage = async ({ data }) => {",
  '  postMessage(await settledApart(data.root, data.apart, 0, () => "read"))',
  "}",
  'postMessage("ready")',
].join("\n")

type Reader = { readonly read: () => Promise<unknown>; readonly ended: () => undefined }

async function readerOver(root: string, apart: Int32Array): Promise<Reader> {
  const worker = new Worker(URL.createObjectURL(new Blob([READER])))
  const told = (): Promise<unknown> =>
    new Promise((settle) => {
      worker.addEventListener("message", (said) => settle(said.data), { once: true })
    })
  await told()
  return {
    read: () => {
      const answered = told()
      worker.postMessage({ root, apart })
      return answered
    },
    ended: () => {
      worker.terminate()
      return undefined
    },
  }
}

test("a read started while a landing composes is answered at once, and one started while it writes waits for the landing to end", async () => {
  const apart = apartFor(1)
  const reader = await readerOver(checkout(), apart)
  landingsKeptApart(apart)
  let answered = false
  let writing: Promise<unknown> = Promise.resolve(null)
  try {
    await landingApart(async () => {
      expect(await reader.read()).toEqual({ settled: "read" })
      await checkoutChanging(async () => {
        writing = reader.read().then((said) => {
          answered = true
          return said
        })
        await Bun.sleep(100)
      })
      await Bun.sleep(50)
      expect(answered).toBe(false)
    })
    expect(await writing).toEqual({ settled: "read" })
  } finally {
    landingsKeptApart(null)
    reader.ended()
  }
})

test("a landing judges beside a read in flight, and waits for that read only to write", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const apart = apartFor(1)
  const judged = { shut: -1 }
  const reading: Judging = {
    named: ["reading"],
    checksFor: () => ["reading"],
    over: async () => {
      judged.shut = Atomics.load(apart, 0)
      Atomics.store(apart, 1, 1)
      return []
    },
  }
  landingsKeptApart(apart)
  try {
    const rows = rowsIn(root, [{ path: "new.txt", body: bytes("proposed") }])
    const landed = landingApart(() => landing(root, rows, "held", reading))
    while (Atomics.load(apart, 0) === 0) await Bun.sleep(5)
    await Bun.sleep(50)
    expect(judged.shut).toBe(0)
    expect(existsSync(join(root, "new.txt"))).toBe(false)
    left(apart, 0)
    expect("refusals" in (await landed)).toBe(false)
    expect(readFileSync(join(root, "new.txt"), "utf8")).toBe("proposed")
    expect(Atomics.load(apart, 0)).toBe(0)
  } finally {
    landingsKeptApart(null)
  }
})

test("a change made outside any landing is kept apart from reads for itself alone", async () => {
  const apart = apartFor(1)
  landingsKeptApart(apart)
  try {
    expect(await checkoutChanging(() => Atomics.load(apart, 0))).toBe(1)
    expect(Atomics.load(apart, 0)).toBe(0)
  } finally {
    landingsKeptApart(null)
  }
})
