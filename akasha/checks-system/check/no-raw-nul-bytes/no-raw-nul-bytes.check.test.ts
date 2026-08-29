import { expect, test } from "bun:test"
import { noRawNulBytes, sitesIn } from "./no-raw-nul-bytes.check.code.ts"

const ROOT = "/repo"

const NUL = "\u0000"

function given(at: string, bytes: Uint8Array) {
  return { root: ROOT, path: at, bytes }
}

function bytesOf(body: string): Uint8Array {
  return new TextEncoder().encode(body)
}

test("a body carrying no NUL is let through", () => {
  expect(noRawNulBytes(given("akasha/held.ts", bytesOf("const one = 1\n")))).toEqual([])
})

test("a single NUL is refused, and the reason names the line and the column", () => {
  const said = noRawNulBytes(given("akasha/held.ts", bytesOf(`one\ntw${NUL}o\n`)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2 column 3")
  expect(said[0]).toContain("hides the whole file from a search")
})

test("a body carrying more than one NUL is reported at the first, with how many stand in it", () => {
  const said = noRawNulBytes(given("akasha/held.ts", bytesOf(`${NUL}a${NUL}b${NUL}`)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1 column 1")
  expect(said[0]).toContain("the first of 3 raw NUL bytes")
})

test("a NUL on the first line is placed by its column from the start of the file", () => {
  expect(sitesIn(bytesOf(`abc${NUL}`))).toEqual([{ line: 1, column: 4 }])
})

test("a newline moves the count on, so a column is read from the line it stands on", () => {
  expect(sitesIn(bytesOf(`\n\n${NUL}`))).toEqual([{ line: 3, column: 1 }])
})

test("a column counts bytes rather than characters, because the file is judged as bytes", () => {
  expect(sitesIn(bytesOf(`é${NUL}`))).toEqual([{ line: 1, column: 3 }])
})

test("an empty body is let through", () => {
  expect(noRawNulBytes(given("akasha/held.ts", new Uint8Array(0)))).toEqual([])
})

test("what the file is named changes nothing, because no kind of file is exempt", () => {
  const held = bytesOf(NUL)
  for (const named of ["akasha/held.ts", "akasha/logo.png", "akasha/data/held.jsonl"]) {
    expect(noRawNulBytes(given(named, held))).toHaveLength(1)
  }
})

test("a body that is not text is judged on its bytes rather than passed over", () => {
  expect(noRawNulBytes(given("akasha/held.ts", new Uint8Array([0xff, 0xfe, 0x00])))).toHaveLength(1)
})

test("a carriage return is no line ending of its own, so a column runs on past it", () => {
  expect(sitesIn(bytesOf(`ab\r\nc${NUL}`))).toEqual([{ line: 2, column: 2 }])
})
