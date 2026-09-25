import { expect, test } from "bun:test"
import { rmSync, utimesSync, writeFileSync } from "node:fs"
import { OK, OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { commitAt } from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import {
  carries,
  finishedAt,
  finishedIn,
  type Held,
  heldNow,
  heldWhile,
  holdAt,
  type Onward,
  saidOfCarried,
  saidOfNoHold,
} from "akasha/command/pages/deploy/modules/holding/deploy-holding.module.code.ts"
import { taken } from "akasha/git/modules/holding/holding.module.code.ts"

const ROOT = process.cwd()

const NO_CHECKOUT = "/"

const FAST = 5

const GONE = 2 ** 22 + 1

const WENT_UP: Answer = { report: ["up\tone"], refusals: [], code: OK }

const REFUSED: Answer = { report: [], refusals: ["kubectl apply exited 1"], code: OPERATIONAL }

const nothing: Onward = () => undefined

function swept(slug: string): string {
  const at = holdAt(ROOT, slug) as string
  rmSync(at, { force: true })
  rmSync(finishedAt(at), { force: true })
  return at
}

function gate(): { readonly open: () => undefined; readonly passed: Promise<undefined> } {
  let open: () => undefined = () => undefined
  const passed = new Promise<undefined>((done) => {
    open = () => {
      done(undefined)
      return undefined
    }
  })
  return { open, passed }
}

function heldAt(
  slug: string,
  arrived: string,
  made: string[],
  answer: Answer,
  until: Promise<undefined> = Promise.resolve(undefined),
  onward: Onward = nothing
): Promise<Held> {
  return heldWhile(
    ROOT,
    slug,
    arrived,
    false,
    async (commit) => {
      made.push(commit)
      await until
      return answer
    },
    onward,
    FAST
  )
}

function codeOf(held: Held): number | null {
  return "value" in held ? held.value.code : null
}

test("a hold is one file named for the thing being put up", () => {
  const at = holdAt(ROOT, "temper-web")
  expect(at).not.toBe(null)
  expect(at as string).toContain("temper-web.lock")
})

test("a root that is no git checkout has no hold", () => {
  expect(holdAt(NO_CHECKOUT, "temper-web")).toBe(null)
})

test("a root that is no git checkout refuses the deploy", async () => {
  const done = await heldWhile(NO_CHECKOUT, "temper-web", "c1", false, async () => WENT_UP)
  expect(done).toHaveProperty("refused")
})

test("a deploy finding the hold free puts up at the commit it arrived with", async () => {
  const slug = "deploy-holding-test-one"
  swept(slug)
  const made: string[] = []
  const done = await heldAt(slug, "c1", made, WENT_UP)
  expect(done).toEqual({ value: WENT_UP })
  expect(made).toEqual(["c1"])
  swept(slug)
})

test("a deploy that ends keeps its commit and its answer beside the hold", async () => {
  const slug = "deploy-holding-test-two"
  const at = swept(slug)
  await heldAt(slug, "c1", [], WENT_UP)
  const kept = finishedIn(finishedAt(at))
  expect(kept?.commit).toBe("c1")
  expect(kept?.answer).toEqual(WENT_UP)
  swept(slug)
})

test("a deploy finding a live hold waits and answers with that deploy where it went up carrying the commit", async () => {
  const slug = "deploy-holding-test-three"
  swept(slug)
  const made: string[] = []
  const running = gate()
  const first = heldAt(slug, "c1", made, WENT_UP, running.passed)
  const second = heldAt(slug, "c1", made, WENT_UP)
  await Bun.sleep(FAST * 4)
  running.open()
  const [one, two] = await Promise.all([first, second])
  expect(made).toEqual(["c1"])
  expect(one).toEqual({ value: WENT_UP })
  expect("value" in two ? two.value.report[0] : null).toBe(saidOfCarried("c1", process.pid, "c1"))
  expect(codeOf(two)).toBe(OK)
  swept(slug)
})

test("every deploy that waited through one deploy shares one follow-up", async () => {
  const slug = "deploy-holding-test-four"
  swept(slug)
  const made: string[] = []
  const running = gate()
  const first = heldAt(slug, "c1", made, WENT_UP, running.passed)
  await Bun.sleep(FAST)
  const waiting = [heldAt(slug, "c2", made, WENT_UP), heldAt(slug, "c2", made, WENT_UP)]
  await Bun.sleep(FAST * 4)
  running.open()
  const done = await Promise.all([first, ...waiting])
  expect(made).toEqual(["c1", "c2"])
  expect(done.map(codeOf)).toEqual([OK, OK, OK])
  swept(slug)
})

test("every deploy that waited answers with the follow-up's refusal", async () => {
  const slug = "deploy-holding-test-five"
  swept(slug)
  const made: string[] = []
  const running = gate()
  const first = heldAt(slug, "c1", made, WENT_UP, running.passed)
  await Bun.sleep(FAST)
  const waiting = [heldAt(slug, "c2", made, REFUSED), heldAt(slug, "c2", made, REFUSED)]
  await Bun.sleep(FAST * 4)
  running.open()
  const done = await Promise.all(waiting)
  await first
  expect(made).toEqual(["c1", "c2"])
  expect(done.map(codeOf)).toEqual([OPERATIONAL, OPERATIONAL])
  swept(slug)
})

test("a refusal of the deploy a call arrived during is not that call's answer", async () => {
  const slug = "deploy-holding-test-six"
  swept(slug)
  const made: string[] = []
  const running = gate()
  const first = heldAt(slug, "c1", made, REFUSED, running.passed)
  await Bun.sleep(FAST)
  const second = heldAt(slug, "c1", made, WENT_UP)
  await Bun.sleep(FAST * 4)
  running.open()
  const [one, two] = await Promise.all([first, second])
  expect(made).toEqual(["c1", "c1"])
  expect(codeOf(one)).toBe(OPERATIONAL)
  expect(two).toEqual({ value: WENT_UP })
  swept(slug)
})

test("a waiting deploy counts its ceiling afresh as the hold passes on", async () => {
  const slug = "deploy-holding-test-seven"
  swept(slug)
  const running = gate()
  let counted = 0
  const onward: Onward = () => {
    counted += 1
    return undefined
  }
  const first = heldAt(slug, "c1", [], WENT_UP, running.passed)
  const second = heldAt(slug, "c2", [], WENT_UP, Promise.resolve(undefined), onward)
  await Bun.sleep(FAST * 4)
  running.open()
  await Promise.all([first, second])
  expect(counted).toBe(2)
  swept(slug)
})

test("a commit named on the call is carried only by a deploy made at that commit", () => {
  const head = commitAt(ROOT, null) as string
  const parent = commitAt(ROOT, "HEAD~1") as string
  expect(carries(ROOT, head, head, false)).toBe(true)
  expect(carries(ROOT, head, parent, false)).toBe(false)
})

test("a call naming no commit is carried by a deploy made at a commit after its own", () => {
  const head = commitAt(ROOT, null) as string
  const parent = commitAt(ROOT, "HEAD~1") as string
  expect(carries(ROOT, head, parent, true)).toBe(true)
  expect(carries(ROOT, parent, head, true)).toBe(false)
})

test("a hold left by a process that is gone is taken rather than refused", async () => {
  const slug = "deploy-holding-test-eight"
  const at = swept(slug)
  writeFileSync(at, `${GONE} 1`)
  const done = await heldAt(slug, "c1", [], WENT_UP)
  expect(done).toEqual({ value: WENT_UP })
  swept(slug)
})

test("a hold naming no process is cleared once it has sat for ten seconds", async () => {
  const slug = "deploy-holding-test-nine"
  const at = swept(slug)
  expect(taken(at, "probe")).toBe(true)
  const long = new Date(Date.now() - 60000)
  utimesSync(at, long, long)
  const done = await heldAt(slug, "c1", [], WENT_UP)
  expect(done).toEqual({ value: WENT_UP })
  swept(slug)
})

test("a hold naming no process is waited on before it has sat that long", async () => {
  const slug = "deploy-holding-test-ten"
  const at = swept(slug)
  expect(taken(at, "probe")).toBe(true)
  const made: string[] = []
  const done = heldAt(slug, "c1", made, WENT_UP)
  await Bun.sleep(FAST * 10)
  expect(made).toEqual([])
  rmSync(at, { force: true })
  expect(await done).toEqual({ value: WENT_UP })
  swept(slug)
})

test("a deploy that threw releases the hold, keeps no answer and throws on", async () => {
  const slug = "deploy-holding-test-eleven"
  const at = swept(slug)
  const thrown = heldWhile(ROOT, slug, "c1", false, async () => {
    throw new Error("no")
  })
  await expect(thrown).rejects.toThrow("no")
  expect(finishedIn(finishedAt(at))).toBe(null)
  const done = await heldAt(slug, "c1", [], WENT_UP)
  expect(done).toEqual({ value: WENT_UP })
  swept(slug)
})

test("what is running is read off the holds a live process keeps", async () => {
  const slug = "deploy-holding-test-twelve"
  swept(slug)
  let running = false
  await heldWhile(ROOT, slug, "c1", false, async () => {
    running = heldNow(ROOT).has(slug)
    return WENT_UP
  })
  expect(running).toBe(true)
  expect(heldNow(ROOT).has(slug)).toBe(false)
  swept(slug)
})

test("a hold left by a process that is gone says no deploy is running", () => {
  const slug = "deploy-holding-test-thirteen"
  const at = swept(slug)
  writeFileSync(at, `${GONE} 1`)
  expect(heldNow(ROOT).has(slug)).toBe(false)
  swept(slug)
})

test("a root that is no git checkout has no deploy running", () => {
  expect(heldNow(NO_CHECKOUT).size).toBe(0)
})

test("a hold that will neither be taken nor cleared is said as that", () => {
  expect(saidOfNoHold("temper-web", "/at")).toContain("temper-web")
  expect(saidOfNoHold("temper-web", "/at")).toContain("/at")
})
