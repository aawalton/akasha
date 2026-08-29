import { expect, test } from "bun:test"
import { bodiesIn } from "../../../testing-system/bodying/bodying.module.code.ts"
import { CEILING, reasonsIn } from "./file-length.check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

function sized(held: number): Uint8Array {
  return new Uint8Array(held).fill(0x61)
}

test("a body under the ceiling is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(CEILING - 1)))).toEqual([])
})

test("a body exactly at the ceiling is let through, so the ceiling is the last size allowed", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(CEILING)))).toEqual([])
})

test("a body over the ceiling is refused, and the reason names the size and the ceiling", () => {
  const said = reasonsIn(given("akasha/held.ts", sized(CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes")
  expect(said[0]).toContain("15,000 byte ceiling")
})

test("an empty body is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(0)))).toEqual([])
})

test("the size counted is bytes rather than characters", () => {
  const one = new TextEncoder().encode("é".repeat(CEILING))
  expect(one.byteLength).toBe(CEILING * 2)
  expect(reasonsIn(given("akasha/held.ts", one))).toHaveLength(1)
})

test("a body that is not text is judged by its size the same as one that is", () => {
  const held = sized(CEILING + 8)
  held[0] = 0xff
  held[1] = 0xfe
  expect(reasonsIn(given("akasha/held.ts", held))).toHaveLength(1)
})

test("what the file is named changes nothing, because no kind of file is exempt", () => {
  const held = sized(CEILING + 1)
  for (const named of ["akasha/held.ts", "akasha/notes.txt", "akasha/data/held.jsonl"]) {
    expect(reasonsIn(given(named, held))).toHaveLength(1)
  }
})

test("a body far over the ceiling is refused once rather than once for each line", () => {
  const held = new TextEncoder().encode("one\n".repeat(CEILING))
  expect(reasonsIn(given("akasha/held.ts", held))).toHaveLength(1)
})

test("where the file stands changes nothing, because the size is read from the body alone", () => {
  const held = sized(CEILING + 1)
  const one = reasonsIn({ root: "/repo", path: "akasha/held.ts", bytes: held })
  const two = reasonsIn({ root: "/elsewhere", path: "akasha/deep/down/held.ts", bytes: held })
  expect(one).toEqual(two)
})
