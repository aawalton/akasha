import { expect, test } from "bun:test"
import { reasonsIn } from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.check.code.ts"
import { bodiesIn } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

const ROOT = "/repo"

const AT = "commands/pages/humming/leaf/humming-leaf.command.code.ts"

const NOTES_AT = "commands/pages/humming/leaf/notes.md"

const READS =
  "export function hummingLeaf(argv: readonly string[]): Answer {\n" +
  '  return answered(argv.includes("--json"))\n}\n'

const given = bodiesIn(ROOT)

test("a command's code the change carries is judged", () => {
  const said = reasonsIn(given(AT, READS))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`argv.includes`")
})

test("a path the change carries that is no TypeScript is passed over", () => {
  expect(reasonsIn(given(NOTES_AT, READS))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: AT, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})
