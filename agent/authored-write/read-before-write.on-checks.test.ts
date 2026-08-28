import { expect, mock, test } from "bun:test"
import type { AddressIndex } from "../../page/required-reading/address-index/address-index.ts"
import type { Reading } from "../read-record.ts"

const ROOT = "/fixture"

const SEAT_PAGE = `${ROOT}/agent/seat/one.seat.md`

const STANDING = `${ROOT}/one.ts`

const NEW_FILE = `${ROOT}/two.ts`

const WAS = "the body already on disk\n"

const NEXT = "the body this write would land\n"

const disk = new Map<string, Uint8Array>([[STANDING, new TextEncoder().encode(WAS)]])

const record = await import("../read-record.ts")
const { bodyItself, sameBody } = record
const { blobId } = await import("../../repo/git/git.ts")

/** What the writer has read, keyed by absolute path, as the record would answer. */
const readings = new Map<string, Reading>()

mock.module("../read-record.ts", () => ({
  bodyItself,
  sameBody,
  readRecordFor: (writer: string) =>
    writer === "seat-1"
      ? {
          page: SEAT_PAGE,
          at: `${SEAT_PAGE}.readings`,
          reading: (absolute: string) => readings.get(absolute) ?? null,
          paths: () => [...readings.keys()],
          replaced: null,
          expired: () => false,
        }
      : null,
}))

/**
 * An index that addresses nothing, so `requiredReadingFor` answers with no warrant.
 *
 * WHAT A PAGE WARRANTS IS TESTED WHERE IT IS COMPUTED. These cases are about the file being
 * written — whether its author had seen the body they are landing on top of — and an index that
 * resolved addresses would put a second, unrelated source of refusals into every one of them.
 */
const index: AddressIndex = {
  frontmatterOf: () => null,
  domainAt: () => null,
  pageTypeNamed: () => null,
  pageNamed: () => null,
  pagesFrom: () => [],
}

mock.module("../../page/required-reading/warrant/warrant.ts", () => ({
  standingHere: () => ({ index, naming: [], rootOf: () => ROOT }),
}))

const { unreadBeforeWriteWith } = await import("./read-before-write.ts")

const unreadBeforeWrite = unreadBeforeWriteWith(
  (absolute) => disk.get(absolute) ?? null,
  () => null
)

function judging(relPath: string, body: string, writer: string | null = "seat-1"): readonly string[] {
  return unreadBeforeWrite(ROOT, [{ relPath, body }], writer)
}

function hasRead(absolute: string, body: string): void {
  readings.set(absolute, { oid: blobId(new TextEncoder().encode(body)), seenAt: 1, mechanicalOid: null })
}

test("a writer who has not read the file it is overwriting is refused", () => {
  readings.clear()
  const said = judging("one.ts", NEXT)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.ts")
})

test("a writer who has read the body standing there is admitted", () => {
  readings.clear()
  hasRead(STANDING, WAS)
  expect(judging("one.ts", NEXT)).toEqual([])
})

test("a reading of some other body is not a reading of this one", () => {
  readings.clear()
  hasRead(STANDING, "a third body nobody wrote\n")
  expect(judging("one.ts", NEXT)).toHaveLength(1)
})

test("a file not there yet has no body to have been read", () => {
  readings.clear()
  expect(judging("two.ts", NEXT)).toEqual([])
  expect(disk.has(NEW_FILE)).toBe(false)
})

test("a body equal to what stands is not judged, nothing about the file changing", () => {
  readings.clear()
  expect(judging("one.ts", WAS)).toEqual([])
})

test("a write nothing identifies the writer of is refused, once for each file", () => {
  readings.clear()
  const said = unreadBeforeWrite(
    ROOT,
    [{ relPath: "one.ts", body: NEXT }, { relPath: "two.ts", body: NEXT }],
    null
  )
  expect(said).toHaveLength(2)
})

test("a writer no page carries the record of is refused", () => {
  readings.clear()
  const said = judging("one.ts", NEXT, "nobody")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("nobody")
})

test("a change writing nothing is judged on nothing", () => {
  readings.clear()
  expect(unreadBeforeWrite(ROOT, [], null)).toEqual([])
})
