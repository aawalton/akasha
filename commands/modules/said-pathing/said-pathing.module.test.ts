import { afterAll, expect, test } from "bun:test"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  barredIn,
  GIT_DIR,
  offRepo,
  outsideRoot,
  pathAt,
  writesOutside,
} from "./said-pathing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const BODY = "export const held = 1\n"

function world(...paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-said-pathing-")
  for (const path of paths) put(root, path, BODY)
  return root
}

test("a relative path is read against the repository root", () => {
  expect(pathAt("/repo", "akasha/one.ts")).toBe("akasha/one.ts")
})

test("an absolute path inside the repository is answered relative to the root", () => {
  expect(pathAt("/repo", "/repo/akasha/one.ts")).toBe("akasha/one.ts")
})

test("a path climbing out of the root is no path inside the repository", () => {
  expect(pathAt("/repo", "../akasha/one.ts")).toBe(null)
})

test("an absolute path outside the repository is no path inside the repository", () => {
  expect(pathAt("/repo", "/elsewhere/one.ts")).toBe(null)
})

test("the repository root is no path inside the repository", () => {
  expect(pathAt("/repo", ".")).toBe(null)
})

test("a path outside the repository is refused by name", () => {
  expect(offRepo("../one.ts")).toContain("is no path inside the repository")
})

test("a path climbing out of the root is outside the root", () => {
  expect(outsideRoot("/repo", "../one.ts")).toBe(true)
  expect(outsideRoot("/repo", "akasha/../../one.ts")).toBe(true)
  expect(outsideRoot("/repo", "..")).toBe(true)
})

test("a path under the root is inside the root however it spells the way there", () => {
  expect(outsideRoot("/repo", "akasha/one.ts")).toBe(false)
  expect(outsideRoot("/repo", "akasha/held/../one.ts")).toBe(false)
  expect(outsideRoot("/repo", "")).toBe(false)
})

test("a name opening with two dots is a name rather than a step out of the root", () => {
  expect(outsideRoot("/repo", "..hidden.ts")).toBe(false)
  expect(outsideRoot("/repo", "akasha/..hidden.ts")).toBe(false)
})

test("an absolute path is folded under the root as a write folds it", () => {
  expect(outsideRoot("/repo", "/elsewhere/one.ts")).toBe(false)
})

test("a path written outside the repository is refused by name", () => {
  expect(writesOutside("../one.ts")).toContain("../one.ts")
  expect(writesOutside("../one.ts")).toContain("lands outside the repository")
})

test("the git folder holds the repository itself and is refused", () => {
  const root = world("akasha/one.ts")
  expect(barredIn(root, GIT_DIR)).toContain("holds the repository itself")
})

test("a path inside the git folder is refused", () => {
  const root = world("akasha/one.ts")
  expect(barredIn(root, `${GIT_DIR}/config`)).toContain("holds the repository itself")
})

test("a folder at the top of the repository is refused", () => {
  const root = world("akasha/one.ts")
  expect(barredIn(root, "akasha")).toContain("folder at the top of the repository")
})

test("a path holding a separator is no folder at the top of the repository", () => {
  const root = world("akasha/one.ts")
  expect(barredIn(root, "akasha/one.ts")).toBe(null)
})

test("a file at the top of the repository is passed over", () => {
  const root = world("one.ts")
  expect(barredIn(root, "one.ts")).toBe(null)
})

test("a path the disk holds nothing at is passed over", () => {
  const root = world("akasha/one.ts")
  expect(barredIn(root, "two.ts")).toBe(null)
})
