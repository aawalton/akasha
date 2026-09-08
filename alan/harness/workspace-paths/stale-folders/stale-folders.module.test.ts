import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { discoverStaleFolders, knownDirsFromFileList } from "./stale-folders.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function fileAt(root: string, rel: string, body: string): undefined {
  const full = join(root, rel)
  mkdirSync(full.slice(0, full.lastIndexOf("/")), { recursive: true })
  writeFileSync(full, body)
  return undefined
}

function worldOf(files: Readonly<Record<string, string>>): {
  root: string
  known: Set<string>
} {
  const root = SCRATCH.rootFor("stale-folders-")
  for (const [rel, body] of Object.entries(files)) fileAt(root, rel, body)
  return { root, known: knownDirsFromFileList(Object.keys(files)) }
}

function stalePathsIn(files: Readonly<Record<string, string>>, extra: readonly string[]): string[] {
  const { root, known } = worldOf(files)
  for (const rel of extra) fileAt(root, rel, "built\n")
  return discoverStaleFolders(root, known).map((o) => o.relativePath)
}

const WORKSPACES = JSON.stringify({ workspaces: ["packages/*"] })

test("a folder no tracked file accounts for is stale", () => {
  expect(
    stalePathsIn(
      {
        "package.json": WORKSPACES,
        "packages/live/package.json": "{}",
        "packages/live/src/index.ts": "",
      },
      ["packages/orphan/dist/index.txt"]
    )
  ).toEqual(["packages/orphan"])
})

test("each orphan is reported on its own", () => {
  expect(
    stalePathsIn(
      {
        "package.json": WORKSPACES,
        "packages/live/package.json": "{}",
        "packages/live/src/index.ts": "",
      },
      ["packages/a-orphan/dist/index.txt", "packages/b-orphan/dist/index.txt"]
    )
  ).toEqual(["packages/a-orphan", "packages/b-orphan"])
})

test("an orphan is reported at its top rather than at the depth of the file inside it", () => {
  expect(
    stalePathsIn(
      {
        "package.json": WORKSPACES,
        "packages/live/package.json": "{}",
        "packages/live/src/index.ts": "",
      },
      ["packages/orphan/nested/deep/dist/index.txt"]
    )
  ).toEqual(["packages/orphan"])
})

test("build output under a package git already knows is left alone", () => {
  expect(
    stalePathsIn(
      {
        "package.json": WORKSPACES,
        "packages/live/package.json": "{}",
        "packages/live/src/index.ts": "",
      },
      ["packages/live/dist/index.txt"]
    )
  ).toEqual([])
})

test("a linked package's own folder is not descended into, so its contents are never stale", () => {
  expect(
    stalePathsIn(
      {
        "package.json": WORKSPACES,
        "packages/live/package.json": "{}",
        "packages/live/src/index.ts": "",
      },
      ["packages/live/node_modules/pkg/package.json", "node_modules/dep/index.js"]
    )
  ).toEqual([])
})

test("a folder is known by a file standing anywhere under it", () => {
  expect([...knownDirsFromFileList(["a/b/c.txt", "a/d.txt"])].sort()).toEqual(["", "a", "a/b"])
})
