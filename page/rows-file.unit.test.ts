import { expect, test } from "bun:test"
import { partNumberOf, rowsFileOf, rowsNamingOf, rowsPartOf } from "./rows-file.ts"

const PAGE = "pages/temper-mine/eso.temper-mine"

const AT = `${PAGE}.md`

const KEY = "items"

// WHAT THE WRITER SPELLS, THE READER TAKES BACK APART. These are the only two functions that put a
// sidecar's name together, so a name either of them can produce is one `rowsNamingOf` must answer
// for. Asserting the round trip rather than a spelling is what makes this hold when the spelling
// changes: a suffix added to `rowsPartOf` and not to the parse fails here.
test("every name the writer can spell is taken back apart into the page and the key it was built from", () => {
  for (const uncommitted of [false, true]) {
    for (const part of [1, 2, 10, 24]) {
      const at = rowsPartOf(rowsFileOf(AT, KEY, uncommitted), part)
      expect(rowsNamingOf(at)).toEqual({ page: PAGE, key: KEY, part })
    }
  }
})

// THE KEY IS NOT THE LAST SEGMENT OF THE NAME. `.partN` and `.uncommitted` both stand between the
// key and `.jsonl`, and both are spelled the way a key is spelled, so a parse reading the segment
// before `.jsonl` takes one of them for the key without ever failing to match.
test("a split sidecar's key is the key, not its part number", () => {
  expect(rowsNamingOf(`${PAGE}.${KEY}.part10.jsonl`)).toEqual({ page: PAGE, key: KEY, part: 10 })
})

test("an uncommitted sidecar's key is the key, not the word uncommitted", () => {
  expect(rowsNamingOf(`${PAGE}.${KEY}.uncommitted.jsonl`)).toEqual({ page: PAGE, key: KEY, part: 1 })
})

test("a split uncommitted sidecar's key is the key, with both suffixes off it", () => {
  expect(rowsNamingOf(`${PAGE}.${KEY}.part3.uncommitted.jsonl`)).toEqual({ page: PAGE, key: KEY, part: 3 })
})

// PART ONE IS THE UNSUFFIXED FILE, so a sidecar in N parts carries N-1 numbered names.
test("part one is the unsuffixed name, which is what the writer and the parse both say", () => {
  const at = rowsFileOf(AT, KEY)
  expect(rowsPartOf(at, 1)).toBe(at)
  expect(partNumberOf(at)).toBe(1)
  expect(rowsNamingOf(at)?.part).toBe(1)
})

test("a name carrying no key is no sidecar", () => {
  expect(rowsNamingOf("dirty/the-tower/rolls.jsonl")).toBeNull()
  expect(rowsNamingOf(`${PAGE}.md`)).toBeNull()
})
