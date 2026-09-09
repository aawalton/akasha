import { expect, test } from "bun:test"
import { bodiesAt } from "@akasha/testing-system/bodying"
import { reasonsIn } from "./id-is-a-uuid-version-7.code-check.code.ts"

const ROOT = "/repo"

const given = bodiesAt(ROOT, "akasha/held.check.ts")

test("a body the change carries is judged by what the decision answers", () => {
  const said = reasonsIn(
    given('export const one = {\n  id: "held-1",\n} as const satisfies Check\n')
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is not a uuid")
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow("akasha/raw.ts")
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})

test("a file that is not TypeScript is passed over", () => {
  const held = { root: ROOT, path: "akasha/notes.txt", bytes: new TextEncoder().encode("id") }
  expect(reasonsIn(held)).toEqual([])
})
