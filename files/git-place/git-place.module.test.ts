import { expect, test } from "bun:test"
import {
  CACHE,
  DATA,
  dataAt,
  dataIn,
  HANDOFF,
  HARNESS_LANDING_LOCK,
  INDEXES,
  KEPT,
  keptAt,
  LANDING_LOCK,
  LEFT,
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

test("what akasha keeps is every store and every hold a landing takes", () => {
  expect([...KEPT].sort()).toEqual([...STORES, LANDING_LOCK, HARNESS_LANDING_LOCK].sort())
})

test("the akasha landing and the harness landing take holds of their own", () => {
  expect(HARNESS_LANDING_LOCK).not.toBe(LANDING_LOCK)
})

test("a name akasha keeps sits directly under the folder git does not track", () => {
  expect(keptAt(LANDING_LOCK)).toBe(".git/akasha-landing.lock")
  expect(keptAt(CACHE)).toBe(storeAt(CACHE))
})

test("a path akasha keeps no longer is read against that folder rather than against a root", () => {
  for (const one of LEFT) {
    expect(one.startsWith(".git/")).toBe(false)
    expect(one.startsWith("/")).toBe(false)
  }
})

test("a path akasha keeps no longer is no name akasha keeps", () => {
  for (const one of LEFT) {
    expect(KEPT).not.toContain(one)
  }
})
