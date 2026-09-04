import { expect, test } from "bun:test"
import { UNNAMED } from "../committing/committing.module.code.ts"
import type { Drafted, Landed } from "../landing/landing.module.code.ts"
import {
  committedLine,
  draftedSaid,
  filledSaid,
  formattedSaid,
  pathsOf,
  type Reported,
  reported,
  type Saying,
} from "./landing-saying.module.code.ts"

const count = (many: number, one: string): string => `${many} ${one}${many === 1 ? "" : "s"}`

const LANDED: Landed = {
  base: "held",
  commit: "c0ffee",
  wrote: ["akasha/two.ts"],
  took: ["akasha/one.ts"],
  noted: [],
  cleared: [],
}

const DRAFTED: Drafted = {
  base: "held",
  drafted: ["akasha/two.ts"],
  patch: "a patch",
  clashed: [],
  judged: ["akasha/two.ts"],
  refused: [],
}

const PLAINLY: Saying = (said) => [
  ...said.wrote.map((one) => `wrote ${one}`),
  ...said.took.map((one) => `took away ${one}`),
]

const OVER: Reported = {
  saying: PLAINLY,
  plainly: PLAINLY,
  changes: [{ path: "akasha/two.ts", body: null }],
  bypassed: null,
  broken: null,
  checks: 1,
  aside: [],
}

test("a report opens with what the caller asked to have said of the landing", () => {
  const said = reported(count, LANDED, { ...OVER, saying: () => ["said by the caller"] })
  expect(said[0]).toBe("said by the caller")
  expect(said).toContain("1 check judged the 1 path asked for, and none refused")
})

test("a report says what became of the commit in its last line", () => {
  expect(reported(count, LANDED, OVER).at(-1)).toBe("committed as c0ffee")
})

test("a commit that could not be named is told apart from a landing that committed nothing", () => {
  expect(committedLine({ ...LANDED, commit: UNNAMED })).toBe(
    "committed — the commit could not be named"
  )
  expect(committedLine({ ...LANDED, commit: "c0ffee" })).toBe("committed as c0ffee")
  expect(committedLine({ ...LANDED, commit: null })).toBe(
    "nothing was committed — what was asked for already stands"
  )
})

test("a report that could not be built names what the landing wrote and took away", () => {
  const said = reported(count, LANDED, {
    ...OVER,
    aside: ["said beside it"],
    saying: () => {
      throw new Error("a report that could not be built")
    },
  })
  expect(said).toEqual([
    "wrote akasha/two.ts",
    "took away akasha/one.ts",
    "said beside it",
    "committed as c0ffee",
    "the report could not be built — a report that could not be built",
  ])
})

test("a landing that ran no check says why in place of the count", () => {
  const said = reported(count, LANDED, { ...OVER, bypassed: "no check ran — the glass was broken" })
  expect(said).toContain("no check ran — the glass was broken")
  expect(said.join("\n")).not.toContain("judged the 1 path")
})

test("checks that would not load are named beside the reason none ran", () => {
  const said = reported(count, LANDED, {
    ...OVER,
    bypassed: "no check ran — the glass was broken",
    broken: "the checks would not load",
  })
  expect(said.join("\n")).toContain("either, so none could have run — the checks would not load")
})

test("what the index took less than the whole of is named in the report", () => {
  const said = reported(count, { ...LANDED, noted: ["akasha/two.ts"] }, OVER)
  expect(said).toContain("the index took less than the whole of this — akasha/two.ts")
})

test("a body that landed other than as it was handed in is named in the report", () => {
  expect(formattedSaid(["akasha/two.ts"])).toEqual([
    "formatted akasha/two.ts as it landed — what stands there is not what was handed in",
  ])
  expect(formattedSaid([])).toEqual([])
})

test("a value worked out as a body landed is named in the report", () => {
  expect(
    filledSaid([{ path: "akasha/two.ts", keys: ["id"], why: "a page new to the index" }])
  ).toEqual(["worked out `id` for akasha/two.ts as it landed — a page new to the index"])
})

test("the paths of a change are read from the change", () => {
  expect(pathsOf([{ path: "akasha/two.ts", body: null }])).toEqual(["akasha/two.ts"])
})

test("what a draft left is named in the report as what was drafted", () => {
  const said = draftedSaid(count, DRAFTED, "a page", ["said beside it"], 2)
  expect(said[0]).toBe("said beside it")
  expect(said).toContain("drafted akasha/two.ts")
  expect(said).toContain("2 checks judged the 1 path the patch would leave, and none refused")
})

test("where a draft's patch is kept is named in the report", () => {
  expect(draftedSaid(count, DRAFTED, "a page", [], 2).at(-1)).toBe(
    "the patch is kept at a page against held"
  )
  expect(draftedSaid(count, DRAFTED, null, [], 2).at(-1)).toBe(
    "the patch is kept at the page of the agent that asked against held"
  )
  expect(draftedSaid(count, { ...DRAFTED, patch: null }, "a page", [], 2).at(-1)).toBe(
    "the patch was worked out to nothing and taken away"
  )
})
