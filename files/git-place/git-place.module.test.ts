import { expect, test } from "bun:test"
import {
  CACHE,
  DATA,
  dataAt,
  dataIn,
  HANDOFF,
  INDEXES,
  STORES,
  storeAt,
  storeIn,
} from "akasha/files/git-place/git-place.module.code.ts"

test("the place sits under the folder git does not track", () => {
  expect(dataAt()).toBe(".git/data")
  expect(dataIn("/repo")).toBe("/repo/.git/data")
})

test("a subtree is answered under the place, so what owns it never spells the place", () => {
  expect(dataAt("reads")).toBe(".git/data/reads")
  expect(dataIn("/repo", "reads", "path")).toBe("/repo/.git/data/reads/path")
})

test("the place under a root is the place itself, taken from that root", () => {
  expect(dataIn("/repo", "held")).toBe(`/repo/${dataAt("held")}`)
})

test("every store akasha keeps is named here", () => {
  expect([...STORES].sort()).toEqual([CACHE, DATA, HANDOFF, INDEXES].sort())
})

test("a store is answered both under a root and on its own", () => {
  expect(storeAt(CACHE)).toBe(".git/cache")
  expect(storeIn("/repo", CACHE, "parse")).toBe("/repo/.git/cache/parse")
})

test("the data store is one of the stores, answered by a name of its own", () => {
  expect(dataAt("sops")).toBe(storeAt(DATA, "sops"))
})
