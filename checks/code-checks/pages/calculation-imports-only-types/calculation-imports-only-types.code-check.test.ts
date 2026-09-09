import { expect, test } from "bun:test"
import { bodiesAt } from "@akasha/testing-system/bodying"
import { reasonsIn } from "./calculation-imports-only-types.code-check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.computed-property.code.ts"

const given = bodiesAt(ROOT, AT)

test("a body the change carries is judged by what the decision answers", () => {
  const said = reasonsIn(given('import { a } from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: AT, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow(AT)
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})

test("a file that is not TypeScript is passed over", () => {
  const notes = bodiesAt(ROOT, "akasha/notes.txt")
  expect(reasonsIn(notes('import { a } from "./x.ts"\n'))).toEqual([])
})

test("a file that is no calculation's code file is passed over", () => {
  const beside = bodiesAt(ROOT, "akasha/held.computed-property.ts")
  expect(reasonsIn(beside('import { a } from "./x.ts"\n'))).toEqual([])
})
