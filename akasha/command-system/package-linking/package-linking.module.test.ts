import { afterAll, expect, test } from "bun:test"
import { existsSync, lstatSync, mkdirSync, readlinkSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { manifest } from "../scratching/scratching.module.test-fixtures.ts"
import {
  linkingsIn,
  nameIn,
  pointedAt,
  reachedAt,
  reachedFor,
  reachedOver,
} from "./package-linking.module.code.ts"

const NAME = "@akasha/held"

const FOLDER = "akasha/held"

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function rooted(): string {
  const root = scratch.rootFor("package-linking-")
  mkdirSync(join(root, "node_modules/@akasha"), { recursive: true })
  return root
}

function linked(root: string, name: string): string | null {
  const at = join(root, "node_modules", ...name.split("/"))
  try {
    return lstatSync(at).isSymbolicLink() ? readlinkSync(at) : null
  } catch {
    return null
  }
}

test("a manifest calling its package is read for that name", () => {
  expect(nameIn(manifest(NAME))).toBe(NAME)
})

test("a manifest that will not parse names no package", () => {
  expect(nameIn("{ not json")).toBeNull()
})

test("a manifest calling its package nothing names none", () => {
  expect(nameIn('{ "private": true }')).toBeNull()
})

test("a link sits beside the packages under the name the package carries", () => {
  expect(reachedAt("/repo", NAME)).toBe("/repo/node_modules/@akasha/held")
})

test("a link climbs one folder for each part of the name it carries", () => {
  expect(pointedAt({ name: NAME, folder: FOLDER })).toBe("../../akasha/held")
})

test("a name carrying no scope climbs one folder", () => {
  expect(pointedAt({ name: "held", folder: FOLDER })).toBe("../akasha/held")
})

test("a manifest that moved says its package is now where the manifest arrived", () => {
  const moved = new Map([
    [`${FOLDER}/package.json`, "akasha/kept/package.json"],
    [`${FOLDER}/held.module.ts`, "akasha/kept/held.module.ts"],
  ])
  expect(linkingsIn(moved, () => manifest(NAME))).toEqual([{ name: NAME, folder: "akasha/kept" }])
})

test("a move carrying no manifest asks for no link", () => {
  const moved = new Map([[`${FOLDER}/held.module.ts`, "akasha/kept/held.module.ts"]])
  expect(linkingsIn(moved, () => manifest(NAME))).toEqual([])
})

test("a link is made where nothing is at that name", () => {
  const root = rooted()
  mkdirSync(join(root, FOLDER), { recursive: true })
  const undo = reachedFor(root, { name: NAME, folder: FOLDER })
  expect(linked(root, NAME)).toBe("../../akasha/held")
  expect(undo).not.toBeNull()
})

test("taking back a link this made leaves nothing at that name", () => {
  const root = rooted()
  mkdirSync(join(root, FOLDER), { recursive: true })
  const undo = reachedFor(root, { name: NAME, folder: FOLDER })
  undo?.()
  expect(linked(root, NAME)).toBeNull()
})

test("a link pointing somewhere else is repointed", () => {
  const root = rooted()
  mkdirSync(join(root, "akasha/was"), { recursive: true })
  mkdirSync(join(root, FOLDER), { recursive: true })
  symlinkSync("../../akasha/was", join(root, "node_modules", NAME))
  reachedFor(root, { name: NAME, folder: FOLDER })
  expect(linked(root, NAME)).toBe("../../akasha/held")
})

test("taking back a repointed link puts the old one back", () => {
  const root = rooted()
  mkdirSync(join(root, "akasha/was"), { recursive: true })
  mkdirSync(join(root, FOLDER), { recursive: true })
  symlinkSync("../../akasha/was", join(root, "node_modules", NAME))
  const undo = reachedFor(root, { name: NAME, folder: FOLDER })
  undo?.()
  expect(linked(root, NAME)).toBe("../../akasha/was")
})

test("a link already pointing at that folder asks for nothing", () => {
  const root = rooted()
  mkdirSync(join(root, FOLDER), { recursive: true })
  symlinkSync("../../akasha/held", join(root, "node_modules", NAME))
  expect(reachedFor(root, { name: NAME, folder: FOLDER })).toBeNull()
})

test("a name already taken by something that is no link is left alone", () => {
  const root = rooted()
  mkdirSync(join(root, "node_modules", NAME), { recursive: true })
  expect(reachedFor(root, { name: NAME, folder: FOLDER })).toBeNull()
})

test("the folder a link points at is made where it is not there", () => {
  const root = rooted()
  reachedFor(root, { name: NAME, folder: FOLDER })
  expect(existsSync(join(root, FOLDER))).toBe(true)
})

test("taking back what was made clears the folder it made", () => {
  const root = rooted()
  const undo = reachedFor(root, { name: NAME, folder: FOLDER })
  undo?.()
  expect(existsSync(join(root, FOLDER))).toBe(false)
})

test("a folder holding anything is left as it is", () => {
  const root = rooted()
  const undo = reachedFor(root, { name: NAME, folder: FOLDER })
  mkdirSync(dirname(join(root, FOLDER, "one.ts")), { recursive: true })
  writeFileSync(join(root, FOLDER, "one.ts"), "export const one = 1\n")
  undo?.()
  expect(existsSync(join(root, FOLDER, "one.ts"))).toBe(true)
})

test("many links are made and taken back together", () => {
  const root = rooted()
  const undo = reachedOver(root, [
    { name: NAME, folder: FOLDER },
    { name: "@akasha/kept", folder: "akasha/kept" },
  ])
  expect(linked(root, "@akasha/kept")).toBe("../../akasha/kept")
  undo()
  expect(linked(root, NAME)).toBeNull()
  expect(linked(root, "@akasha/kept")).toBeNull()
})
