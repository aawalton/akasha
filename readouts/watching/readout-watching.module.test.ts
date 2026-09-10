import { expect, test } from "bun:test"
import { NO_SECRET_TO_CARRY_ON } from "../relay/readout-relay.module.code.ts"
import {
  foldersOf,
  holdsAny,
  takingOf,
  type WatchedReadout,
  type WatchSetup,
} from "./readout-watching.module.code.ts"

const ROOT = "/nowhere"

const FOLDER = "/nowhere/alan/track/daily/days/pages/2026-09-10"

const MADE_OF = `${FOLDER}/day-2026-09-10.day.uncommitted.ts`

const BESIDE = `${FOLDER}/day-2026-09-10.day.health-samples.jsonl`

const PAGE = "readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts"

const ALAN = "https://alanwalton.com"

const JENNY = "https://smilingjenny.me"

function watchedOf(
  take: (now: Date) => Promise<number | null>,
  to: readonly string[] = []
): WatchedReadout {
  return { page: PAGE, folders: [FOLDER], holds: (at) => at === MADE_OF, to, take }
}

function setupOf(one: Partial<WatchSetup> & { readonly watched: readonly WatchedReadout[] }) {
  const said: string[] = []
  const ends: unknown[] = []
  const written: (readonly [string, number])[] = []
  const carriedTo: string[] = []
  const setup: WatchSetup = {
    root: ROOT,
    said: (level, message): undefined => {
      said.push(`${level} ${message}`)
      return undefined
    },
    ended: (thrown): undefined => {
      ends.push(thrown)
      return undefined
    },
    secret: null,
    kept: (_root, page, value): undefined => {
      written.push([page, value])
      return undefined
    },
    carried: (to): Promise<undefined> => {
      carriedTo.push(to)
      return Promise.resolve(undefined)
    },
    ...one,
  }
  return { said, ends, written, carriedTo, taking: takingOf(setup) }
}

async function idle(): Promise<undefined> {
  for (let turn = 0; turn < 12; turn += 1) await Promise.resolve()
  return undefined
}

test("the folders every watched readout reads are gathered into one set", () => {
  const one = watchedOf(() => Promise.resolve(1))
  const two = { ...watchedOf(() => Promise.resolve(2)), folders: [FOLDER, "/nowhere/else"] }
  expect([...foldersOf([one, two])].sort()).toEqual([FOLDER, "/nowhere/else"])
  expect(holdsAny([one, two])(MADE_OF)).toBe(true)
  expect(holdsAny([one, two])(BESIDE)).toBe(false)
})

test("a take finding the value the take before found writes nothing", async () => {
  const held = setupOf({ watched: [watchedOf(() => Promise.resolve(4))] })
  held.taking.open()
  await held.taking.settled()
  held.taking.moved([MADE_OF])
  await held.taking.settled()
  expect(held.written).toEqual([[PAGE, 4]])
})

test("a take finding no reading writes nothing", async () => {
  const held = setupOf({ watched: [watchedOf(() => Promise.resolve(null))] })
  held.taking.open()
  await held.taking.settled()
  expect(held.written).toEqual([])
})

test("a file beside the files a readout is made from takes nothing again", async () => {
  let takes = 0
  const held = setupOf({
    watched: [
      watchedOf(() => {
        takes += 1
        return Promise.resolve(takes)
      }),
    ],
  })
  held.taking.open()
  await held.taking.settled()
  held.taking.moved([BESIDE])
  await held.taking.settled()
  expect(takes).toBe(1)
})

test("any number of changes arriving while a take runs make one further take", async () => {
  let takes = 0
  const gates: (() => undefined)[] = []
  const take = (): Promise<number | null> => {
    takes += 1
    const mine = takes
    return new Promise<number | null>((settle) => {
      gates.push((): undefined => {
        settle(mine)
        return undefined
      })
    })
  }
  const held = setupOf({ watched: [watchedOf(take)] })
  held.taking.open()
  expect(takes).toBe(1)
  held.taking.moved([MADE_OF])
  held.taking.moved([MADE_OF])
  held.taking.moved([MADE_OF])
  gates[0]?.()
  await idle()
  expect(takes).toBe(2)
  gates[1]?.()
  await held.taking.settled()
  expect(takes).toBe(2)
})

test("a take that throws is said and ends the run", async () => {
  const thrown = new Error("the tracking day could not be read")
  const held = setupOf({ watched: [watchedOf(() => Promise.reject(thrown))] })
  held.taking.open()
  await held.taking.settled()
  expect(held.ends).toEqual([thrown])
  expect(held.said).toContain("ERROR the tracking day could not be read")
})

test("a reading that changed is carried to every site the readout names", async () => {
  const held = setupOf({
    watched: [watchedOf(() => Promise.resolve(7), [ALAN, JENNY])],
    secret: "a-secret",
  })
  held.taking.open()
  await held.taking.settled()
  expect(held.carriedTo).toEqual([ALAN, JENNY])
  expect(held.said).toContain("INFO upkeep-sleep=7")
})

test("a carry that fails to one site does not stop the carry to another site", async () => {
  const held = setupOf({
    watched: [watchedOf(() => Promise.resolve(7), [ALAN, JENNY])],
    secret: "a-secret",
    carried: (to): Promise<undefined> => {
      if (to === ALAN) return Promise.reject(new Error("502"))
      return Promise.resolve(undefined)
    },
  })
  held.taking.open()
  await held.taking.settled()
  expect(held.ends).toEqual([])
  expect(held.said.some((one) => one.includes("was not carried to https://alanwalton.com"))).toBe(
    true
  )
  expect(held.said).toContain("INFO upkeep-sleep=7")
})

test("nothing is carried where no relay secret is stated", async () => {
  const held = setupOf({ watched: [watchedOf(() => Promise.resolve(7), [ALAN])] })
  held.taking.open()
  await held.taking.settled()
  expect(held.carriedTo).toEqual([])
  expect(held.said).toContain(`ERROR ${NO_SECRET_TO_CARRY_ON}`)
  expect(held.written).toEqual([[PAGE, 7]])
})
