import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import {
  bodyFor,
  dropUncommitted,
  keepUncommitted,
  nameFor,
  uncommittedIn,
} from "./page-uncommitted.module.code.ts"

const PAGE = "akasha/one/amy.seat.ts"

const BESIDE = "akasha/one/amy.seat.uncommitted.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-uncommitted-")
  mkdirSync(join(root, dirname(PAGE)), { recursive: true })
  return root
}

function standing(root: string, body: string): void {
  writeFileSync(join(root, BESIDE), body, "utf8")
}

test("a page with no file beside it carries no uncommitted values", () => {
  expect(uncommittedIn(rooted(), PAGE)).toBeNull()
})

test("what is kept beside a page is read back from it", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { claudeCodeSessionUuid: "one", beats: 3 })
  expect(uncommittedIn(root, PAGE)).toEqual({ claudeCodeSessionUuid: "one", beats: 3 })
})

test("what is kept stands beside the page under the reserved tail", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  expect(existsSync(join(root, BESIDE))).toBe(true)
})

test("keeping again replaces what stood there", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  keepUncommitted(root, PAGE, { held: "two" })
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "two" })
})

test("a file that stands but will not load is refused rather than read as empty", () => {
  const root = rooted()
  standing(root, "export const amySeatUncommitted = (\n")
  expect(() => uncommittedIn(root, PAGE)).toThrow(/could not be loaded/)
})

test("a file that loads declaring nothing is refused rather than read as empty", () => {
  const root = rooted()
  standing(root, "export const amySeatUncommitted = 7\n")
  expect(() => uncommittedIn(root, PAGE)).toThrow(/declares no values/)
})

test("dropping takes the file away, and the page carries nothing again", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  dropUncommitted(root, PAGE)
  expect(existsSync(join(root, BESIDE))).toBe(false)
  expect(uncommittedIn(root, PAGE)).toBeNull()
})

test("dropping what never stood is an answer rather than a failure", () => {
  expect(() => dropUncommitted(rooted(), PAGE)).not.toThrow()
})

test("the exported name carries the page's own name", () => {
  expect(nameFor(PAGE)).toBe("amySeatUncommitted")
  expect(nameFor("akasha/one/file-length.check.ts")).toBe("fileLengthCheckUncommitted")
})

test("what is written is a page's own shape, so one loader answers both", () => {
  expect(bodyFor(PAGE, { held: "one" })).toBe(
    'export const amySeatUncommitted = {\n  "held": "one"\n} as const\n'
  )
})

test("a path that is no TypeScript file holds nothing and is refused for keeping", () => {
  const root = rooted()
  expect(uncommittedIn(root, "akasha/one/notes.txt")).toBeNull()
  expect(() => keepUncommitted(root, "akasha/one/notes.txt", {})).toThrow(/no TypeScript file/)
})
