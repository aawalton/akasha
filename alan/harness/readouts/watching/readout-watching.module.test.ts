import { expect, test } from "bun:test"
import { NO_SECRET_TO_CARRY_ON } from "../relay/readout-relay.module.code.ts"
import {
  foldersOf,
  holdsAny,
  takingOf,
  valueFileOf,
  valuesOf,
  type WatchedReadout,
  type WatchSetup,
} from "./readout-watching.module.code.ts"

const ROOT = "/nowhere"

const FOLDER = "/nowhere/alan/track/daily/days/pages/2026-09-10"

const MADE_OF = `${FOLDER}/day-2026-09-10.day.uncommitted.ts`

const BESIDE = `${FOLDER}/day-2026-09-10.day.health-samples.jsonl`

const PAGE = "alan/harness/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts"

const OTHER_PAGE = "alan/harness/readouts/pages/upkeep-surplus/upkeep-surplus.readout.ts"

const DAY = "day"

const FOOD = "food-entry"

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
  const beats: (readonly string[])[] = []
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
    beat: (silent): undefined => {
      beats.push([...silent].sort())
      return undefined
    },
    ...one,
  }
  return { said, ends, written, carriedTo, beats, taking: takingOf(setup) }
}

async function idle(): Promise<undefined> {
  for (let turn = 0; turn < 12; turn += 1) await Promise.resolve()
  return undefined
}

function after(ms: number): Promise<undefined> {
  return new Promise<undefined>((keep) => {
    setTimeout(() => keep(undefined), ms)
  })
}

type Gate = (value: number | null) => undefined

function gatedOf(gates: Gate[]): (now: Date) => Promise<number | null> {
  return () =>
    new Promise<number | null>((keep) => {
      gates.push((value): undefined => {
        keep(value)
        return undefined
      })
    })
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

test("the value files followed are the ones the readouts read a page type from", () => {
  const one = { ...watchedOf(() => Promise.resolve(1)), pageTypes: [DAY] }
  const two = { ...watchedOf(() => Promise.resolve(2)), page: OTHER_PAGE, pageTypes: [FOOD] }
  const three = watchedOf(() => Promise.resolve(3))
  expect([...valuesOf(ROOT, [one, two, three])].sort()).toEqual(
    [valueFileOf(ROOT, DAY), valueFileOf(ROOT, FOOD)].sort()
  )
  expect(valuesOf(ROOT, [three]).size).toBe(0)
})

test("a readout is taken again when the values of a page type it reads move", async () => {
  let takes = 0
  const held = setupOf({
    watched: [
      {
        ...watchedOf(() => {
          takes += 1
          return Promise.resolve(takes)
        }),
        pageTypes: [DAY],
      },
    ],
  })
  held.taking.open()
  await held.taking.settled()
  held.taking.indexMoved([valueFileOf(ROOT, DAY)])
  await held.taking.settled()
  expect(takes).toBe(2)
  expect(held.written).toEqual([
    [PAGE, 1],
    [PAGE, 2],
  ])
})

test("another page type's values moving takes nothing", async () => {
  let takes = 0
  const held = setupOf({
    watched: [
      {
        ...watchedOf(() => {
          takes += 1
          return Promise.resolve(takes)
        }),
        pageTypes: [DAY],
      },
    ],
  })
  held.taking.open()
  await held.taking.settled()
  held.taking.indexMoved([valueFileOf(ROOT, "subagent")])
  await held.taking.settled()
  expect(takes).toBe(1)
})

test("a readout reading no page type is left alone by any value moving", async () => {
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
  held.taking.indexMoved([valueFileOf(ROOT, DAY), valueFileOf(ROOT, FOOD)])
  await held.taking.settled()
  expect(takes).toBe(1)
})

test("a value moving takes a readout no moved file would have taken", async () => {
  let takes = 0
  const held = setupOf({
    watched: [
      {
        ...watchedOf(() => {
          takes += 1
          return Promise.resolve(takes)
        }),
        holds: () => false,
        pageTypes: [FOOD],
      },
    ],
  })
  held.taking.open()
  await held.taking.settled()
  held.taking.moved([MADE_OF, BESIDE])
  await held.taking.settled()
  expect(takes).toBe(1)
  held.taking.indexMoved([valueFileOf(ROOT, FOOD)])
  await held.taking.settled()
  expect(takes).toBe(2)
})

test("a take that throws costs its own reading rather than the readings beside it", async () => {
  const thrown = new Error("the tracking day could not be read")
  const gates: Gate[] = []
  const held = setupOf({
    watched: [
      watchedOf(() => Promise.reject(thrown)),
      { ...watchedOf(gatedOf(gates)), page: OTHER_PAGE },
    ],
  })
  held.taking.open()
  await idle()
  expect(held.ends).toEqual([])
  expect(held.written).toEqual([])
  gates[0]?.(11)
  await held.taking.settled()
  expect(held.written).toEqual([[OTHER_PAGE, 11]])
  expect(held.ends).toEqual([thrown])
})

test("the run ends at the grace where a take beside a thrown one has not settled", async () => {
  const thrown = new Error("the tracking day could not be read")
  const gates: Gate[] = []
  const held = setupOf({
    watched: [
      watchedOf(() => Promise.reject(thrown)),
      { ...watchedOf(gatedOf(gates)), page: OTHER_PAGE },
    ],
    endingGraceMs: 5,
  })
  held.taking.open()
  await idle()
  expect(held.ends).toEqual([])
  await after(40)
  expect(held.ends).toEqual([thrown])
  held.taking.stop()
})

test("the first take to throw is the one the ending is handed", async () => {
  const first = new Error("the first take")
  const second = new Error("the second take")
  const held = setupOf({
    watched: [
      watchedOf(() => Promise.reject(first)),
      { ...watchedOf(() => Promise.reject(second)), page: OTHER_PAGE },
    ],
  })
  held.taking.open()
  await held.taking.settled()
  expect(held.ends).toEqual([first])
})

test("a round of takes that all settled leaves the watch saying the round landed", async () => {
  const held = setupOf({ watched: [watchedOf(() => Promise.resolve(4))] })
  held.taking.open()
  await held.taking.settled()
  expect(held.beats).toEqual([[]])
})

test("the readouts that answered nothing are named with the round that landed", async () => {
  const held = setupOf({
    watched: [
      watchedOf(() => Promise.resolve(4)),
      { ...watchedOf(() => Promise.resolve(null)), page: OTHER_PAGE },
    ],
  })
  held.taking.open()
  await held.taking.settled()
  expect(held.beats).toEqual([[OTHER_PAGE]])
})

test("a readout answering a number and then nothing is named as answering nothing", async () => {
  let takes = 0
  const held = setupOf({
    watched: [
      watchedOf(() => {
        takes += 1
        return Promise.resolve(takes === 1 ? 4 : null)
      }),
    ],
  })
  held.taking.open()
  await held.taking.settled()
  held.taking.moved([MADE_OF])
  await held.taking.settled()
  expect(held.beats).toEqual([[], [PAGE]])
})

test("a round in which any take threw leaves the watch saying nothing", async () => {
  const held = setupOf({
    watched: [
      watchedOf(() => Promise.resolve(4)),
      { ...watchedOf(() => Promise.reject(new Error("no day"))), page: OTHER_PAGE },
    ],
  })
  held.taking.open()
  await held.taking.settled()
  expect(held.beats).toEqual([])
  expect(held.ends.length).toBe(1)
})

test("saying a round landed that itself throws is said rather than ending the run", async () => {
  const held = setupOf({
    watched: [watchedOf(() => Promise.resolve(4))],
    beat: (): undefined => {
      throw new Error("the lock would not open")
    },
  })
  held.taking.open()
  await held.taking.settled()
  expect(held.ends).toEqual([])
  expect(held.said.some((one) => one.includes("the lock would not open"))).toBe(true)
})

test("nothing is carried where no relay secret is stated", async () => {
  const held = setupOf({ watched: [watchedOf(() => Promise.resolve(7), [ALAN])] })
  held.taking.open()
  await held.taking.settled()
  expect(held.carriedTo).toEqual([])
  expect(held.said).toContain(`ERROR ${NO_SECRET_TO_CARRY_ON}`)
  expect(held.written).toEqual([[PAGE, 7]])
})
