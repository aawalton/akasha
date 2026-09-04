import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code-system/code-source"
import { parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noBodyReadBesideAnIndex } from "./no-body-read-beside-an-index.syntax-rule.code.ts"

const ANSWERING = 'import type { Answering } from "@akasha/indexes/answering"\n'

const READING = 'import type { Reading } from "@akasha/indexes/shape"\n'

const SHADOW = 'import type { Shadow } from "@akasha/pages-system/shadow"\n'

const VALUE_AT = 'import { type Value, valueAt } from "@akasha/pages-system/page-value"\n'

const BESIDE = 'import { uncommittedIn, wholeValue } from "@akasha/pages-system/page-uncommitted"\n'

const TRIPS = `${ANSWERING}${VALUE_AT}export function one(root: string, path: string, index: Answering): Value | null {\n  index.everyPath()\n  return valueAt(path, root)\n}\n`

function at(path: string, text: string) {
  return { path, source: parsedAs(path, text) }
}

test("a file naming no index is refused nothing", () => {
  const text = `${VALUE_AT}export function one(root: string, path: string) {\n  return valueAt(path, root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a file naming no reader of page bodies is refused nothing", () => {
  const text = `${ANSWERING}export function one(root: string, index: Answering) {\n  return index.everyPath().concat(root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a root beside an Answering with a page body read off that root is refused", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(root: string, path: string, index: Answering): Value | null {\n  index.everyPath()\n  return valueAt(path, root)\n}\n`
  const said = noBodyReadBesideAnIndex(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`valueAt` reads a page body from `root`")
})

test("a root beside the index's Reading is refused the same way", () => {
  const text = `${READING}${VALUE_AT}export function one(repo: string, path: string, given: Reading): Value | null {\n  given.holds(path)\n  return valueAt(path, repo)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toHaveLength(1)
})

test("a root beside a Shadow is refused the same way", () => {
  const text = `${SHADOW}${VALUE_AT}export function one(repository: string, path: string, cast: Shadow): Value | null {\n  cast.filed()\n  return valueAt(path, repository)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toHaveLength(1)
})

test("a read one call down through a function of the same file is refused", () => {
  const text = `${ANSWERING}${VALUE_AT}function heldFor(root: string, path: string): Value | null {\n  return valueAt(path, root)\n}\nexport function one(root: string, path: string, index: Answering): Value | null {\n  index.everyPath()\n  return heldFor(root, path)\n}\n`
  const said = noBodyReadBesideAnIndex(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`heldFor` reads a page body from `root`")
})

test("a root and a page body read with no index handed in is admitted", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(root: string, path: string): Value | null {\n  return valueAt(path, root)\n}\nexport function two(index: Answering) {\n  return index.everyPath()\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a root beside an index reading no page body is admitted", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(root: string, index: Answering): readonly string[] {\n  return index.everyPath().map((path) => root + path)\n}\nexport function two(path: string, root: string) {\n  return valueAt(path, root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("an index with no root is admitted though a page body is read", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(path: string, index: Answering): Value | null {\n  index.everyPath()\n  return valueAt(path, path)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a body-reading helper called by an index carrying no root of its own is admitted", () => {
  const text = `${ANSWERING}${VALUE_AT}function heldFor(root: string, path: string): Value | null {\n  return valueAt(path, root)\n}\nexport function one(path: string, index: Answering): Value | null {\n  index.everyPath()\n  return heldFor("/elsewhere", path)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a Reading bound from anywhere but the index is admitted", () => {
  const text = `import type { Reading } from "./change-freshness.module.code.ts"\n${VALUE_AT}export function one(root: string, path: string, read: Reading): Value | null {\n  read(path)\n  return valueAt(path, root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a valueAt bound from anywhere but page-value is admitted", () => {
  const text = `${ANSWERING}import { valueAt } from "./somewhere-else.module.code.ts"\nexport function one(root: string, path: string, index: Answering) {\n  index.everyPath()\n  return valueAt(path, root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("a read of what git is told to keep out of the commit is admitted", () => {
  const text = `${ANSWERING}${BESIDE}export function one(root: string, page: string, index: Answering) {\n  index.everyPath()\n  return uncommittedIn(root, page)\n}\nexport function two(root: string, page: string, value: Value, index: Answering) {\n  index.everyPath()\n  return wholeValue(root, page, value)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("the line named is the line the read is on", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(root: string, path: string, index: Answering): Value | null {\n  index.everyPath()\n  return valueAt(path, root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))[0]?.line).toBe(5)
})

test("the refusal names what to do instead", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(root: string, path: string, index: Answering): Value | null {\n  index.everyPath()\n  return valueAt(path, root)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))[0]?.reason).toContain("`PageOf`")
})

const MAKES_A_SHADOW = `${READING}${VALUE_AT}function bodyOnDisk(root: string) {\n  return (path: string) => valueAt(path, root)\n}\nfunction shadowOver(reading: Reading, root: string, bodyOf: (path: string) => Value | null) {\n  reading.holds(root)\n  return bodyOf\n}\nexport function shadowAt(root: string) {\n  return shadowOver(readingIn(root), root, bodyOnDisk(root))\n}\n`

test("a root beside the index with the reader of page bodies handed in is admitted", () => {
  expect(noBodyReadBesideAnIndex(parsed(MAKES_A_SHADOW))).toEqual([])
})

test("the same code is judged the same wherever it sits", () => {
  const one = noBodyReadBesideAnIndex(at("akasha/pages-system/shadow/shadow.module.code.ts", TRIPS))
  const two = noBodyReadBesideAnIndex(at("akasha/one/other.module.code.ts", TRIPS))
  expect(one).toEqual(two)
  expect(one).toHaveLength(1)
})

test("a root reaching a function under a name carrying none of the three words is not seen", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(where: string, path: string, index: Answering): Value | null {\n  index.everyPath()\n  return valueAt(path, where)\n}\n`
  expect(noBodyReadBesideAnIndex(parsed(text))).toEqual([])
})

test("one function reading twice is refused once, at the first read", () => {
  const text = `${ANSWERING}${VALUE_AT}export function one(root: string, path: string, index: Answering) {\n  index.everyPath()\n  const first = valueAt(path, root)\n  const second = valueAt(path, root)\n  return first ?? second\n}\n`
  const said = noBodyReadBesideAnIndex(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.line).toBe(5)
})
