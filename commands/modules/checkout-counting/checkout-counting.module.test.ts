import { afterAll, expect, test } from "bun:test"
import { symlinkSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { columnsOf, linesAt, linesIn, madeBy, pathsIn } from "./checkout-counting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(): string {
  const root = scratch.rootFor("checkout-counting-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  put(root, ".gitignore", "node_modules/\n")
  put(root, "one.ts", "one\ntwo\n")
  put(root, "node_modules/pkg/two.ts", "two\n")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

test("what git holds is listed, and what the repository ignores is not", () => {
  expect([...pathsIn(repoWith())].sort()).toEqual([".gitignore", "one.ts"])
})

test("a file not yet committed is listed where the repository does not ignore it", () => {
  const root = repoWith()
  put(root, "three.ts", "three\n")

  expect(pathsIn(root)).toContain("three.ts")
})

test("a symbolic link is the one path git holds", () => {
  const root = repoWith()
  symlinkSync(join(root, "one.ts"), join(root, "linked.ts"))
  git(root, ["add", "-A"])

  expect(pathsIn(root)).toContain("linked.ts")
})

test("a root git could not list throws rather than listing none", () => {
  const root = scratch.rootFor("checkout-counting-ungit-")
  put(root, "one.ts", "one\n")

  expect(() => pathsIn(root)).toThrow()
})

test("a file a generated folder holds was generated", () => {
  expect(madeBy("pages-core/generated/one.ts")).toBe(true)
  expect(madeBy("web/build/one.js")).toBe(true)
  expect(madeBy("web/dist/one.js")).toBe(true)
  expect(madeBy("out/one.js")).toBe(true)
  expect(madeBy("coverage/one.js")).toBe(true)
})

test("a name carrying generated before its extension was generated", () => {
  expect(madeBy("one.generated.yaml")).toBe(true)
  expect(madeBy("infra/k8s/service.generated.yaml")).toBe(true)
})

test("a folder name is matched whole rather than as the opening of a longer name", () => {
  expect(madeBy("pages/vendor/one.ts")).toBe(false)
  expect(madeBy("story/generated.ts")).toBe(false)
  expect(madeBy("builder/one.ts")).toBe(false)
  expect(madeBy("outer/one.ts")).toBe(false)
})

test("a line is counted by the newline ending it, and a last line ending in none counts", () => {
  expect(linesIn(new TextEncoder().encode(""))).toBe(0)
  expect(linesIn(new TextEncoder().encode("a\n"))).toBe(1)
  expect(linesIn(new TextEncoder().encode("a"))).toBe(1)
  expect(linesIn(new TextEncoder().encode("a\nb"))).toBe(2)
  expect(linesIn(new TextEncoder().encode("a\nb\n"))).toBe(2)
  expect(linesIn(new TextEncoder().encode("\n\n"))).toBe(2)
})

test("a file that could not be read answers no number", () => {
  const root = repoWith()

  expect(linesAt(root, "one.ts")).toBe(2)
  expect(linesAt(root, "nowhere.ts")).toBe(null)
})

test("the first column is set out to the left and every column after it to the right", () => {
  expect(
    columnsOf([
      ["type", "files"],
      ["ts", "3"],
      ["markdown", "11"],
    ])
  ).toEqual(["type      files", "ts            3", "markdown     11"])
})

test("a row naming fewer columns than the widest row ends where its own columns end", () => {
  expect(columnsOf([["one", "two"], ["one"]])).toEqual(["one  two", "one"])
})
