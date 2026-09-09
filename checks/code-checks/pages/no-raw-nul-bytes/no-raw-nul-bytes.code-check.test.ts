import { afterAll, expect, test } from "bun:test"
import { writing } from "@akasha/command-system/scratching/testing"
import { shadowAt } from "@akasha/pages/shadow"
import { bodiesIn, bytesOf } from "@akasha/testing-system/bodying"
import { onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  exemptIn,
  holdingBytes,
  noRawNulBytes,
  reasonsIn,
  sitesIn,
} from "./no-raw-nul-bytes.code-check.code.ts"
import {
  CERTIFICATE,
  ELSEWHERE,
  letThrough,
  scratch,
  seeded,
  WALLPAPER,
} from "./no-raw-nul-bytes.code-check.test-fixtures.ts"

const ROOT = "/repo"

const NUL = "\u0000"

const given = bodiesIn(ROOT)

const HOLDING = letThrough()

const TWO_NULS =
  "line 1 column 1 is the first of 2 raw NUL bytes, which hide the whole file from a search"

afterAll(scratch.sweep)

test("a property saying it holds bytes is the one this check lets through", () => {
  expect(holdingBytes({ holdsBytes: true, fileName: CERTIFICATE })).toBe(true)
})

test("a property saying nothing about bytes is judged", () => {
  expect(holdingBytes({ fileName: CERTIFICATE })).toBe(false)
})

test("a file a property names, beside a page carrying that property, is let through", () => {
  expect(exemptIn(CERTIFICATE, shadowAt(HOLDING))).toBe(true)
})

test("a file of that name where no page carries the property is judged", () => {
  expect(exemptIn(ELSEWHERE, shadowAt(HOLDING))).toBe(false)
})

test("a property naming no file lets its section through wherever that file sits", () => {
  expect(exemptIn(WALLPAPER, shadowAt(HOLDING))).toBe(true)
})

test("a property naming a file it says nothing about leaves that file judged", () => {
  expect(exemptIn(CERTIFICATE, shadowAt(seeded({ fileName: CERTIFICATE })))).toBe(false)
})

test("a body carrying no NUL is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", bytesOf("const one = 1\n")))).toEqual([])
})

test("a single NUL is refused, and the reason names the line and the column", () => {
  const said = reasonsIn(given("akasha/held.ts", bytesOf(`one\ntw${NUL}o\n`)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2 column 3")
  expect(said[0]).toContain("hides the whole file from a search")
})

test("a body carrying more than one NUL is reported at the first, with how many are in it", () => {
  const said = reasonsIn(given("akasha/held.ts", bytesOf(`${NUL}a${NUL}b${NUL}`)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1 column 1")
  expect(said[0]).toContain("the first of 3 raw NUL bytes")
})

test("a NUL on the first line is placed by its column from the start of the file", () => {
  expect(sitesIn(bytesOf(`abc${NUL}`))).toEqual([{ line: 1, column: 4 }])
})

test("a newline moves the count on, so a column is read from the line it sits on", () => {
  expect(sitesIn(bytesOf(`\n\n${NUL}`))).toEqual([{ line: 3, column: 1 }])
})

test("a column counts bytes rather than characters, because the file is judged as bytes", () => {
  expect(sitesIn(bytesOf(`é${NUL}`))).toEqual([{ line: 1, column: 3 }])
})

test("an empty body is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", new Uint8Array(0)))).toEqual([])
})

test("what the file is named changes nothing, because no kind of file is exempt", () => {
  const held = bytesOf(NUL)
  for (const named of ["akasha/held.ts", "akasha/logo.png", "akasha/data/held.jsonl"]) {
    expect(reasonsIn(given(named, held))).toHaveLength(1)
  }
})

test("a body that is not text is judged on its bytes rather than passed over", () => {
  expect(reasonsIn(given("akasha/held.ts", new Uint8Array([0xff, 0xfe, 0x00])))).toHaveLength(1)
})

test("the check lets the named file through and says why it judges the one elsewhere", () => {
  const held = `${NUL}${NUL}`
  writing(HOLDING, CERTIFICATE, held)
  writing(HOLDING, ELSEWHERE, held)
  const both = onDisk(HOLDING)
  const change = { root: HOLDING, changed: [CERTIFICATE, ELSEWHERE], before: both, after: both }
  expect(noRawNulBytes(change, shadowAt(HOLDING))).toEqual([{ path: ELSEWHERE, reason: TWO_NULS }])
})

test("a carriage return is no line ending of its own, so a column runs on past it", () => {
  expect(sitesIn(bytesOf(`ab\r\nc${NUL}`))).toEqual([{ line: 2, column: 2 }])
})
