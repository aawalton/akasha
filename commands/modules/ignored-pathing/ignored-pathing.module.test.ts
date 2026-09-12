import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  asideFrom,
  heldBack,
} from "akasha/commands/modules/ignored-pathing/ignored-pathing.module.code.ts"
import { repoWith, scratch } from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const IGNORING = { ".gitignore": "*.uncommitted.*\n", "one.txt": "committed" }

const HELD_OUT = "deep/held.uncommitted.json"

function ignoringRepo(): string {
  return repoWith(IGNORING)
}

test("a path the repository ignores is parted from the paths a landing commits", () => {
  const said = heldBack(ignoringRepo(), [
    { path: "new.txt", body: bytesOf("proposed") },
    { path: HELD_OUT, body: bytesOf("unsaid") },
  ])
  expect(said.committing.map((one) => one.path)).toEqual(["new.txt"])
  expect(said.uncommitted.map((one) => one.path)).toEqual([HELD_OUT])
})

test("a change the repository ignores no path of is parted by nothing", () => {
  const said = heldBack(ignoringRepo(), [{ path: "new.txt", body: bytesOf("proposed") }])
  expect(said.committing.map((one) => one.path)).toEqual(["new.txt"])
  expect(said.uncommitted).toEqual([])
})

test("an ignored path taken away is renamed aside, and one that is not there is not", () => {
  const root = ignoringRepo()
  writeFileSync(join(root, "kept.uncommitted.json"), "was")
  const said = asideFrom(root, [
    { path: "kept.uncommitted.json", body: null },
    { path: "gone.uncommitted.json", body: null },
  ])
  expect([...said]).toEqual(["kept.uncommitted.json"])
})

test("a folder the repository ignores is taken away as a folder rather than renamed aside", () => {
  const root = ignoringRepo()
  mkdirSync(join(root, "deep.uncommitted.d"))
  expect([...asideFrom(root, [{ path: "deep.uncommitted.d", body: null }])]).toEqual([])
})
