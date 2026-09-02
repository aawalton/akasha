import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { said as gitIn } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import {
  dirtyIn,
  dirtyOf,
  keptOf,
  prunedIn,
  restoreIn,
  saying,
  stampOf,
} from "./restore-akasha-when-dirty.agent-hook.code.ts"

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
  expect(restoreIn(root)).toEqual({ put: [], kept: null })
})

test("a file changed outside the gate goes back as HEAD has it", () => {
  const root = seeded()
  put(root, "akasha/held.domain.ts", "two\n")
  expect(restoreIn(root).put).toEqual(["akasha/held.domain.ts"])
  expect(readFileSync(join(root, "akasha/held.domain.ts"), "utf8")).toBe("one\n")
  expect(dirtyIn(root)).toEqual([])
})

test("a file added outside the gate is taken away", () => {
  const root = seeded()
  put(root, "akasha/stray.domain.ts", "stray\n")
  expect(restoreIn(root).put).toEqual(["akasha/stray.domain.ts"])
  expect(existsSync(join(root, "akasha/stray.domain.ts"))).toBe(false)
  expect(dirtyIn(root)).toEqual([])
})

test("a file taken away outside the gate comes back", () => {
  const root = seeded()
  rmSync(join(root, "akasha/held.domain.ts"))
  expect(restoreIn(root).put).toEqual(["akasha/held.domain.ts"])
  expect(readFileSync(join(root, "akasha/held.domain.ts"), "utf8")).toBe("one\n")
})

test("nothing outside the akasha folder is touched", () => {
  const root = seeded()
  put(root, "outside/kept.ts", "changed\n")
  put(root, "akasha/held.domain.ts", "two\n")
  expect(restoreIn(root).put).toEqual(["akasha/held.domain.ts"])
  expect(readFileSync(join(root, "outside/kept.ts"), "utf8")).toBe("changed\n")
})

test("what went back is named to the agent", () => {
  expect(saying(["akasha/one.ts"], null)).toContain("1 path")
  expect(saying(["akasha/one.ts", "akasha/two.ts"], null)).toContain("2 paths")
  expect(saying(["akasha/one.ts"], null)).toContain("akasha/one.ts")
})

test("where the copies are is named to the agent", () => {
  expect(saying(["akasha/one.ts"], "/w/.git/akasha-restored/at")).toContain(
    "/w/.git/akasha-restored/at"
  )
})

test("an entry for a path in neither the commit nor the folder is taken out of the index", () => {
  const root = seeded()
  put(root, "akasha/gone.domain.ts", "gone\n")
  gitIn(root, ["add", "--all"])
  rmSync(join(root, "akasha/gone.domain.ts"))
  expect(dirtyIn(root).map((one) => one.path)).toEqual(["akasha/gone.domain.ts"])
  expect(restoreIn(root).put).toEqual(["akasha/gone.domain.ts"])
  expect(dirtyIn(root)).toEqual([])
})

test("a path that could not go back is no path that went back", () => {
  const root = seeded()
  put(root, "akasha/added.domain.ts", "added\n")
  gitIn(root, ["add", "--all"])
  expect(restoreIn(root)).toEqual({ put: [], kept: null })
  expect(dirtyIn(root).map((one) => one.path)).toEqual(["akasha/added.domain.ts"])
})

test("a body another call left is copied out before it goes", () => {
  const root = seeded()
  put(root, "akasha/held.domain.ts", "another agent's unlanded fix\n")
  const back = restoreIn(root)
  expect(back.put).toEqual(["akasha/held.domain.ts"])
  expect(back.kept).not.toBeNull()
  expect(readFileSync(join(String(back.kept), "akasha/held.domain.ts"), "utf8")).toBe(
    "another agent's unlanded fix\n"
  )
})

test("a body a call added is copied out before it is taken away", () => {
  const root = seeded()
  put(root, "akasha/stray.domain.ts", "stray\n")
  const back = restoreIn(root)
  expect(readFileSync(join(String(back.kept), "akasha/stray.domain.ts"), "utf8")).toBe("stray\n")
})

test("the copies are kept outside the akasha folder", () => {
  const root = seeded()
  put(root, "akasha/held.domain.ts", "two\n")
  const back = restoreIn(root)
  expect(String(back.kept).startsWith(join(root, ".git"))).toBe(true)
  expect(dirtyIn(root)).toEqual([])
})

test("a body no longer on disk is no body to copy", () => {
  const root = seeded()
  rmSync(join(root, "akasha/held.domain.ts"))
  expect(keptOf(root, dirtyIn(root), "at")).toBeNull()
})

test("a stamp orders the copies by when they were made", () => {
  const early = stampOf(new Date("2026-09-02T10:00:00.000Z"), 7)
  const late = stampOf(new Date("2026-09-02T11:00:00.000Z"), 7)
  expect([late, early].sort()).toEqual([early, late])
})

test("only the newest copies are kept", () => {
  const root = seeded()
  for (const one of ["a", "b", "c", "d"]) {
    mkdirSync(join(root, ".git/akasha-restored", one), { recursive: true })
  }
  expect(prunedIn(root, 2)).toEqual(["a", "b"])
  expect(existsSync(join(root, ".git/akasha-restored/a"))).toBe(false)
  expect(existsSync(join(root, ".git/akasha-restored/d"))).toBe(true)
})

test("a tree that kept nothing is pruned as nothing", () => {
  const root = seeded()
  expect(prunedIn(root, 2)).toEqual([])
})
