import { expect, test } from "bun:test"
import {
  helpOf,
  type Surface,
  surfaceOf,
} from "akasha/commands/modules/help-writing/help-writing.module.code.ts"

const SHOWN: Surface = {
  taking: [
    { said: "--file-path <path>", takes: "the page read" },
    { said: "--key <name>", takes: "the one secret" },
  ],
  helpNotes: ["nothing is written."],
}

test("a page stating what a command takes and no help note has a surface", () => {
  expect(surfaceOf({ taking: [{ said: "<id>", takes: "the id" }] })).toEqual({
    taking: [{ said: "<id>", takes: "the id" }],
    helpNotes: [],
  })
})

test("a page stating help notes and nothing taken has a surface", () => {
  expect(surfaceOf({ helpNotes: ["it is piped in."] })).toEqual({
    taking: [],
    helpNotes: ["it is piped in."],
  })
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
  expect(helpOf("akasha held", null, { taking: SHOWN.taking, helpNotes: [] })).toHaveLength(4)
})
