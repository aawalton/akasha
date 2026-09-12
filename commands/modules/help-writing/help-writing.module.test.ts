import { afterAll, expect, test } from "bun:test"
import { calling, HELP, HELP_SHORT } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  ANSWERS,
  OUTSIDE,
  rootWith,
  SURFACED,
  sweep,
} from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import {
  helpOf,
  rulesIn,
  type Surface,
  statementsIn,
  surfaceOf,
} from "akasha/commands/modules/help-writing/help-writing.module.code.ts"

afterAll(sweep)

const NONE: ReadonlySet<string> = new Set()

const GAP: ReadonlySet<string> = new Set(["gap"])

const CENSUS = "A check reads this census."

const SHOWN: Surface = {
  taking: [
    { said: "--file-path <path>", takes: "the page read" },
    { said: "--key <name>", takes: "the one secret" },
  ],
  holds: [],
  notYet: [],
}

test("a page stating what a command takes has a surface", () => {
  expect(surfaceOf({ taking: [{ said: "<id>", takes: "the id" }] }, NONE)).toEqual({
    taking: [{ said: "<id>", takes: "the id" }],
    holds: [],
    notYet: [],
  })
})

test("the invariants a page states are read as their statements alone", () => {
  const page = {
    invariants: [
      {
        invariantKind: "departure",
        statement: "Unlocking a rule already unlocked changes nothing.",
      },
      { invariantKind: "absence", statement: "Nothing here writes." },
    ],
  }
  expect(statementsIn(page, NONE)).toEqual({
    holds: ["Unlocking a rule already unlocked changes nothing.", "Nothing here writes."],
    notYet: [],
  })
})

test("an invariant of a kind that does not hold yet is parted from the rest", () => {
  const page = {
    invariants: [
      { invariantKind: "departure", statement: "Nothing here writes." },
      { invariantKind: "gap", statement: CENSUS },
    ],
  }
  expect(statementsIn(page, GAP)).toEqual({
    holds: ["Nothing here writes."],
    notYet: [CENSUS],
  })
})

test("an entry stating no statement is read as nothing", () => {
  expect(
    statementsIn({ invariants: [{ invariantKind: "departure" }, "held", null, 1] }, NONE)
  ).toEqual({ holds: [], notYet: [] })
  expect(statementsIn({ invariants: "held" }, NONE)).toEqual({ holds: [], notYet: [] })
  expect(statementsIn({}, NONE)).toEqual({ holds: [], notYet: [] })
})

test("no invariant of its own makes a page one help is answered from", () => {
  expect(
    surfaceOf({ invariants: [{ invariantKind: "absence", statement: "Nothing writes." }] }, NONE)
  ).toBe(null)
})

test("the invariants are written under the arguments", () => {
  const said = helpOf(
    "akasha held",
    null,
    { taking: [{ said: "<id>", takes: "the id" }], holds: ["Nothing here writes."], notYet: [] },
    []
  )
  expect(said).toEqual(["akasha held", "", "  <id>  the id", "", "Nothing here writes."])
})

test("an invariant that does not hold yet is written under a heading saying so", () => {
  const said = helpOf(
    "akasha held",
    null,
    {
      taking: [{ said: "<id>", takes: "the id" }],
      holds: ["Nothing here writes."],
      notYet: [CENSUS],
    },
    []
  )
  expect(said).toEqual([
    "akasha held",
    "",
    "  <id>  the id",
    "",
    "Nothing here writes.",
    "",
    "Not yet true:",
    CENSUS,
  ])
})

test("a page whose every invariant does not hold yet is written with the heading alone", () => {
  const said = helpOf("akasha held", null, { taking: [], holds: [], notYet: [CENSUS] }, [])
  expect(said).toEqual(["akasha held", "", "", "Not yet true:", CENSUS])
})

const RULED = {
  directives: [
    {
      directiveKind: "rule",
      name: "One Read A Call",
      act: "Run one read per shell call.",
      warrant: "Output past what one shell result holds is lost.",
      aids: ["One call naming many files caps itself."],
    },
  ],
}

test("a directive is read as the rule that directive is", () => {
  expect(rulesIn(RULED)).toEqual([
    "One Read A Call: Run one read per shell call.\n" +
      "Output past what one shell result holds is lost.\n" +
      "- One call naming many files caps itself.",
  ])
})

test("a page stating no directive is read as no rule", () => {
  expect(rulesIn({})).toEqual([])
  expect(rulesIn({ directives: "held" })).toEqual([])
})

test("the rules are written under the invariants, each after a blank line", () => {
  const said = helpOf("akasha held", null, { taking: [], holds: [], notYet: [] }, ["one", "two"])
  expect(said).toEqual(["akasha held", "", "", "one", "", "two"])
})

test("a page stating nothing taken has none", () => {
  expect(surfaceOf({}, NONE)).toBe(null)
  expect(surfaceOf(null, NONE)).toBe(null)
})

test("the arguments are padded so what each takes lines up", () => {
  const said = helpOf("akasha page secret show", "one secret answered", SHOWN, [])
  expect(said[0]).toBe("akasha page secret show — one secret answered")
  expect(said[1]).toBe("")
  expect(said[2]).toBe("  --file-path <path>  the page read")
  expect(said[3]).toBe("  --key <name>        the one secret")
})

test("a call handed no definition opens with the call alone", () => {
  expect(helpOf("akasha page secret show", null, SHOWN, [])[0]).toBe("akasha page secret show")
})

test("asking for help lists the commands with what each page says it is for", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, definition: "what held is for" }])
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toContain("  akasha held  what held is for")
  expect(said.report).toContain("say `akasha <command> --help` for what one takes")
})

test("`-h` says what `--help` says", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, definition: "what held is for" }])
  expect(await calling([HELP_SHORT], { ...OUTSIDE, root })).toEqual(
    await calling([HELP], { ...OUTSIDE, root })
  )
})

test("a command whose page states no definition is listed by name alone", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report).toContain("  akasha held")
})

test("a command answers for help out of the surface its own page states", async () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS, definition: "what held is for", surface: SURFACED },
  ])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha held — what held is for")
  expect(said.report).toContain("  --file-path <path>  a path it takes")
})

test("a command stating what it takes is answered for from its page", async () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS, taking: [{ said: "<id>", takes: "the id acted on" }] },
  ])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report).toContain("  <id>  the id acted on")
})

test("a command stating no surface is handed the flag to answer for itself", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("--help")
})
