import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { said as gitIn } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import { dirtyIn, dirtyOf, restoreIn, saying } from "./restore-akasha-when-dirty.agent-hook.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function seeded(): string {
  const root = scratch.rootFor("akasha-dirty-")
  gitIn(root, ["init", "--quiet"])
  put(root, "akasha/held.domain.ts", "one\n")
  put(root, "outside/kept.ts", "one\n")
  gitIn(root, ["add", "--all"])
  gitIn(root, ["-c", "user.email=t@t", "-c", "user.name=t", "commit", "--quiet", "-m", "seed"])
  return root
}

test("a status line outside the akasha folder is passed over", () => {
  expect(dirtyOf(" M outside/kept.ts\n")).toEqual([])
})

test("a changed path inside the akasha folder is read off the status", () => {
  expect(dirtyOf(" M akasha/held.domain.ts\n")).toEqual([
    { code: "M", path: "akasha/held.domain.ts" },
  ])
})

test("a path a rename moved to is the one read", () => {
  expect(dirtyOf("R  akasha/was.ts -> akasha/now.ts\n")).toEqual([
    { code: "R", path: "akasha/now.ts" },
  ])
})

test("a quoted path is unquoted", () => {
  expect(dirtyOf('?? "akasha/a b.ts"\n')).toEqual([{ code: "??", path: "akasha/a b.ts" }])
})

test("a clean tree is put back as nothing", () => {
  const root = seeded()
  expect(dirtyIn(root)).toEqual([])
  expect(restoreIn(root)).toEqual([])
})

test("a file changed outside the gate goes back as HEAD has it", () => {
  const root = seeded()
  put(root, "akasha/held.domain.ts", "two\n")
  expect(restoreIn(root)).toEqual(["akasha/held.domain.ts"])
  expect(readFileSync(join(root, "akasha/held.domain.ts"), "utf8")).toBe("one\n")
  expect(dirtyIn(root)).toEqual([])
})

test("a file added outside the gate is taken away", () => {
  const root = seeded()
  put(root, "akasha/stray.domain.ts", "stray\n")
  expect(restoreIn(root)).toEqual(["akasha/stray.domain.ts"])
  expect(existsSync(join(root, "akasha/stray.domain.ts"))).toBe(false)
  expect(dirtyIn(root)).toEqual([])
})

test("a file taken away outside the gate comes back", () => {
  const root = seeded()
  rmSync(join(root, "akasha/held.domain.ts"))
  expect(restoreIn(root)).toEqual(["akasha/held.domain.ts"])
  expect(readFileSync(join(root, "akasha/held.domain.ts"), "utf8")).toBe("one\n")
})

test("nothing outside the akasha folder is touched", () => {
  const root = seeded()
  put(root, "outside/kept.ts", "changed\n")
  put(root, "akasha/held.domain.ts", "two\n")
  expect(restoreIn(root)).toEqual(["akasha/held.domain.ts"])
  expect(readFileSync(join(root, "outside/kept.ts"), "utf8")).toBe("changed\n")
})

test("what went back is named to the agent", () => {
  expect(saying(["akasha/one.ts"])).toContain("1 path")
  expect(saying(["akasha/one.ts", "akasha/two.ts"])).toContain("2 paths")
  expect(saying(["akasha/one.ts"])).toContain("akasha/one.ts")
})

test("an entry for a path in neither the commit nor the folder is taken out of the index", () => {
  const root = seeded()
  put(root, "akasha/gone.domain.ts", "gone\n")
  gitIn(root, ["add", "--all"])
  rmSync(join(root, "akasha/gone.domain.ts"))
  expect(dirtyIn(root).map((one) => one.path)).toEqual(["akasha/gone.domain.ts"])
  expect(restoreIn(root)).toEqual(["akasha/gone.domain.ts"])
  expect(dirtyIn(root)).toEqual([])
})

test("a path that could not go back is no path that went back", () => {
  const root = seeded()
  put(root, "akasha/added.domain.ts", "added\n")
  gitIn(root, ["add", "--all"])
  expect(restoreIn(root)).toEqual([])
  expect(dirtyIn(root).map((one) => one.path)).toEqual(["akasha/added.domain.ts"])
})
