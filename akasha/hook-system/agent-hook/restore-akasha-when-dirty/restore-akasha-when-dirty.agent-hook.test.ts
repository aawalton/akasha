import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { gitIn } from "../../../command-system/committing/committing.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import {
  dirtyIn,
  restoreIn,
  saying,
  standingIn,
} from "./restore-akasha-when-dirty.agent-hook.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function put(root: string, at: string, body: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, body)
}

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
  expect(standingIn(" M outside/kept.ts\n")).toEqual([])
})

test("a changed path inside the akasha folder is read off the status", () => {
  expect(standingIn(" M akasha/held.domain.ts\n")).toEqual([
    { code: "M", path: "akasha/held.domain.ts" },
  ])
})

test("a path a rename moved to is the one read", () => {
  expect(standingIn("R  akasha/was.ts -> akasha/now.ts\n")).toEqual([
    { code: "R", path: "akasha/now.ts" },
  ])
})

test("a quoted path is unquoted", () => {
  expect(standingIn('?? "akasha/a b.ts"\n')).toEqual([{ code: "??", path: "akasha/a b.ts" }])
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
