import { expect, test } from "bun:test"
import {
  helpOf,
  type Surface,
  statementsIn,
  surfaceOf,
} from "akasha/commands/modules/help-writing/help-writing.module.code.ts"

const SHOWN: Surface = {
  taking: [
    { said: "--file-path <path>", takes: "the page read" },
    { said: "--key <name>", takes: "the one secret" },
  ],
  helpNotes: ["nothing is written."],
  invariants: [],
}

test("a page stating what a command takes and no help note has a surface", () => {
  expect(surfaceOf({ taking: [{ said: "<id>", takes: "the id" }] })).toEqual({
    taking: [{ said: "<id>", takes: "the id" }],
    helpNotes: [],
    invariants: [],
  })
})

test("a page stating help notes and nothing taken has a surface", () => {
  expect(surfaceOf({ helpNotes: ["it is piped in."] })).toEqual({
    taking: [],
    helpNotes: ["it is piped in."],
    invariants: [],
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
  expect(statementsIn(page)).toEqual([
    "Unlocking a rule already unlocked changes nothing.",
    "Nothing here writes.",
  ])
})

test("an entry stating no statement is read as nothing", () => {
  expect(statementsIn({ invariants: [{ invariantKind: "departure" }, "held", null, 1] })).toEqual(
    []
  )
  expect(statementsIn({ invariants: "held" })).toEqual([])
  expect(statementsIn({})).toEqual([])
})

test("no invariant of its own makes a page one help is answered from", () => {
  expect(
    surfaceOf({ invariants: [{ invariantKind: "absence", statement: "Nothing writes." }] })
  ).toBe(null)
})

test("the invariants are written under the help notes", () => {
  const said = helpOf("akasha held", null, {
    taking: [],
    helpNotes: ["it repeats."],
    invariants: ["Nothing here writes."],
  })
  expect(said).toEqual(["akasha held", "", "", "it repeats.", "", "Nothing here writes."])
})

test("a page stating neither has none", () => {
  expect(surfaceOf({})).toBe(null)
  expect(surfaceOf(null)).toBe(null)
})

test("the arguments are padded so what each takes lines up", () => {
  const said = helpOf("akasha page secret show", "one secret answered", SHOWN)
  expect(said[0]).toBe("akasha page secret show — one secret answered")
  expect(said[1]).toBe("")
  expect(said[2]).toBe("  --file-path <path>  the page read")
  expect(said[3]).toBe("  --key <name>        the one secret")
})

test("a call handed no definition opens with the call alone", () => {
  expect(helpOf("akasha page secret show", null, SHOWN)[0]).toBe("akasha page secret show")
})

test("the help notes are written under the arguments", () => {
  expect(helpOf("akasha held", null, SHOWN).slice(4)).toEqual(["", "nothing is written."])
})

test("a command stating no help note is written down without them", () => {
  expect(
    helpOf("akasha held", null, { taking: SHOWN.taking, helpNotes: [], invariants: [] })
  ).toHaveLength(4)
})
