import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { loadedFrom, valueAt, valueIn } from "./page-value.module.code.ts"

const A = "01a04b79-0000-7000-8000-00000000000a"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a body exporting one object is answered with that object", () => {
  expect(valueIn(`export const it = { id: "${A}", slug: "a" } as const\n`)).toEqual({
    id: A,
    slug: "a",
  })
})

test("a body that will not load is answered with why rather than by throwing", () => {
  const loaded = loadedFrom("the new body")
  expect(loaded.value).toBe(null)
  expect(typeof loaded.failed).toBe("string")
})

test("a body that will not load answers with no value rather than throwing", () => {
  expect(
    valueIn(
      `import { oidOf } from "./reading.module.code.ts"\nexport const it = { id: oidOf("x") }\n`
    )
  ).toBe(null)
  expect(valueIn("the new body")).toBe(null)
})

test("a path standing as a folder holds no page, and is not read as though it were a file", () => {
  const repo = scratch.rootFor("akasha-entries-folder-")
  mkdirSync(join(repo, "held"), { recursive: true })

  expect(valueAt("held", repo)).toBe(null)
})

test("a path standing as nothing holds no page", () => {
  const repo = scratch.rootFor("akasha-entries-gone-")

  expect(valueAt("gone.module.ts", repo)).toBe(null)
})

test("a path standing as a file is read for the page it holds", () => {
  const repo = scratch.rootFor("akasha-entries-file-")
  writeFileSync(join(repo, "held.module.ts"), 'export const held = { slug: "held" }\n', "utf8")

  expect(valueAt("held.module.ts", repo)?.["slug"]).toBe("held")
})
