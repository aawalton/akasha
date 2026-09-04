import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import {
  fileItself,
  ITSELF,
  writtenNamesFrom,
  writtenNamesIn,
} from "./file-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PATH = "akasha/thing/thing.module.ts"

test("a file warrants itself, by the body standing at it", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  const oid = writing(root, PATH, "one\n")
  expect(fileItself(root, PATH)).toEqual([{ path: PATH, oid, owed: ITSELF }])
})

test("a file not yet standing warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  expect(fileItself(root, "akasha/thing/new.module.ts")).toEqual([])
})

test("a directory standing at the path warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  mkdirSync(join(root, "akasha/thing"), { recursive: true })
  expect(fileItself(root, "akasha/thing")).toEqual([])
})

test("the body warranted is the body standing on disk, not the one read before", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  writing(root, PATH, "one\n")
  const oid = writing(root, PATH, "two\n")
  expect(fileItself(root, PATH)[0]?.oid).toBe(oid)
})

test("a warrant carries why the reading is owed", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  writing(root, PATH, "one\n")
  expect(fileItself(root, PATH)[0]?.owed).toBe(ITSELF)
})

test("a property saying a machine writes its file names that file", () => {
  const held = writtenNamesFrom([{ machineWritten: true, fileName: "bun.lock" }])
  expect([...held]).toEqual(["bun.lock"])
})

test("a property saying nothing of a machine names no file", () => {
  expect([...writtenNamesFrom([{ fileName: "package.json" }])]).toEqual([])
})

test("a property saying an author writes its file names no file", () => {
  const held = writtenNamesFrom([{ machineWritten: false, fileName: "package.json" }])
  expect([...held]).toEqual([])
})

test("a property standing at no value names no file", () => {
  expect([...writtenNamesFrom([null])]).toEqual([])
})

test("a property naming no file names no file", () => {
  expect([...writtenNamesFrom([{ machineWritten: true }])]).toEqual([])
})

test("where the index cannot answer, no file is named as one a machine writes", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  expect([...writtenNamesIn(root)]).toEqual([])
})

test("where the index cannot answer, a file still warrants itself", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  const oid = writing(root, "bun.lock", "one\n")
  expect(fileItself(root, "bun.lock")).toEqual([{ path: "bun.lock", oid, owed: ITSELF }])
})
