import { expect, test } from "bun:test"
import {
  camelizePath,
  headOf,
  isPropertyPath,
  reachedIn,
  segmentsOf,
} from "akasha/page/core/filter/modules/property-path/property-path.module.code.ts"

const A_STORY = {
  slug: "azarinth-healer",
  externalIdentity: [{ source: "royal-road", externalId: "16946" }, { source: "kindle" }],
  externalTags: ["LitRPG", "Fantasy"],
}

test("a key holding a dot names a path", () => {
  expect(isPropertyPath("external-identity.source")).toBe(true)
  expect(isPropertyPath("source")).toBe(false)
})

test("a path is parted on its dots", () => {
  expect(segmentsOf("externalIdentity.source")).toEqual(["externalIdentity", "source"])
  expect(segmentsOf("source")).toEqual(["source"])
})

test("the first segment names the property a page carries", () => {
  expect(headOf("externalIdentity.source")).toBe("externalIdentity")
  expect(headOf("source")).toBe("source")
})

test("a path is spelled one segment at a time and its dots remain", () => {
  expect(camelizePath("external-identity.source")).toBe("externalIdentity.source")
  expect(camelizePath("last-synced-at")).toBe("lastSyncedAt")
})

test("a list on the way is entered one element at a time", () => {
  expect(reachedIn(A_STORY, "externalIdentity.source")).toEqual(["royal-road", "kindle"])
})

test("a segment no value carries reaches nothing", () => {
  expect(reachedIn(A_STORY, "externalIdentity.externalId")).toEqual(["16946"])
  expect(reachedIn(A_STORY, "externalIdentity.rank")).toEqual([])
  expect(reachedIn(A_STORY, "rank.source")).toEqual([])
})

test("a key of one segment reaches the value that key holds", () => {
  expect(reachedIn(A_STORY, "slug")).toEqual(["azarinth-healer"])
})

test("a list at the end of a path remains a list", () => {
  expect(reachedIn(A_STORY, "externalTags")).toEqual([["LitRPG", "Fantasy"]])
})
