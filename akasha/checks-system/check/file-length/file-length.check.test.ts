import { expect, test } from "bun:test"
import { CEILING, fileLength } from "./file-length.check.code.ts"

const ROOT = "/repo/akasha"

function given(at: string, bytes: Uint8Array) {
  return { root: ROOT, path: `${ROOT}/${at}`, bytes }
}

function sized(held: number): Uint8Array {
  return new Uint8Array(held).fill(0x61)
}

test("a body under the ceiling is let through", () => {
  expect(fileLength(given("held.ts", sized(CEILING - 1)))).toEqual([])
})

test("a body exactly at the ceiling is let through, so the ceiling is the last size allowed", () => {
  expect(fileLength(given("held.ts", sized(CEILING)))).toEqual([])
})

test("a body over the ceiling is refused, and the reason names the size and the ceiling", () => {
  const said = fileLength(given("held.ts", sized(CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes")
  expect(said[0]).toContain("15,000 byte ceiling")
})

test("an empty body is let through", () => {
  expect(fileLength(given("held.ts", sized(0)))).toEqual([])
})

test("the size counted is bytes rather than characters", () => {
  const one = new TextEncoder().encode("é".repeat(CEILING))
  expect(one.byteLength).toBe(CEILING * 2)
  expect(fileLength(given("held.ts", one))).toHaveLength(1)
})

test("a body that is not text is judged by its size the same as one that is", () => {
  const held = sized(CEILING + 8)
  held[0] = 0xff
  held[1] = 0xfe
  expect(fileLength(given("held.ts", held))).toHaveLength(1)
})

test("what the file is named changes nothing, because no kind of file is exempt", () => {
  const held = sized(CEILING + 1)
  for (const named of ["held.ts", "notes.txt", "data/held.ts", "dirty/held.ts"]) {
    expect(fileLength(given(named, held))).toHaveLength(1)
  }
})
