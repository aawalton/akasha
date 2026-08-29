import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { fileItself, ITSELF } from "./file-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PATH = "akasha/thing/thing.module.ts"

function standing(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}

test("a file warrants itself, by the body standing at it", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  const oid = standing(root, PATH, "one\n")
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
  standing(root, PATH, "one\n")
  const oid = standing(root, PATH, "two\n")
  expect(fileItself(root, PATH)[0]?.oid).toBe(oid)
})

test("a warrant carries why the reading is owed", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  standing(root, PATH, "one\n")
  expect(fileItself(root, PATH)[0]?.owed).toBe(ITSELF)
})
