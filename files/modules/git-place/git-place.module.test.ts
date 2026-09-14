import { expect, test } from "bun:test"
import {
  CACHE,
  DATA,
  GIT_AT,
  gitIn,
  HANDOFF,
  INDEXES,
  keptAt,
  LANDING_LOCK,
  LEFT,
  storeIn,
} from "akasha/files/modules/git-place/git-place.module.code.ts"

test("the folder git does not track is answered both under a root and on its own", () => {
  expect(GIT_AT).toBe(".git")
  expect(gitIn("/repo")).toBe("/repo/.git")
})

test("every name akasha keeps sits under that folder", () => {
  expect(keptAt(CACHE).startsWith(`${GIT_AT}/`)).toBe(true)
})

test("a store is answered under a root", () => {
  expect(storeIn("/repo", CACHE, "parse")).toBe("/repo/.git/cache/parse")
})

test("a subtree is answered under a store, so what owns it never spells the store", () => {
  expect(storeIn("/repo", CACHE, "parse", "held")).toBe("/repo/.git/cache/parse/held")
})

test("a name akasha keeps sits directly under the folder git does not track", () => {
  expect(keptAt(LANDING_LOCK)).toBe(".git/akasha-landing.lock")
  expect(keptAt(CACHE)).toBe(".git/cache")
})

test("a path akasha keeps no longer is read against that folder rather than against a root", () => {
  for (const one of LEFT) {
    expect(one.startsWith(".git/")).toBe(false)
    expect(one.startsWith("/")).toBe(false)
  }
})

test("the index is a path akasha keeps no longer, since the index left this folder", () => {
  expect(LEFT).toContain(INDEXES)
})

test("the push hand-off is a path akasha keeps no longer, since nothing hands a push off", () => {
  expect(LEFT).toContain(HANDOFF)
})

test("the data store is a path akasha keeps no longer, since nothing writes under it", () => {
  expect(LEFT).toContain(DATA)
})
