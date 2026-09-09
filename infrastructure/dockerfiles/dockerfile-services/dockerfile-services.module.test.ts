import { describe, expect, test } from "bun:test"
import { existsSync, statSync } from "node:fs"
import { join } from "node:path"
import { listWorkspaceDirs } from "akasha/alan/harness/workspace-paths/workspace-dirs/workspace-dirs.module.code.ts"
import { ROOT, SERVICES } from "./dockerfile-services.module.code.ts"

function isDirectory(path: string): boolean {
  return statSync(path, { throwIfNoEntry: false })?.isDirectory() === true
}

const entries = Object.entries(SERVICES)

describe("ROOT", () => {
  test("names a checkout, which the `.git` at its top marks", () => {
    expect(existsSync(join(ROOT, ".git"))).toBe(true)
  })

  test("holds the root manifest `listWorkspaceDirs` reads", () => {
    expect(listWorkspaceDirs(ROOT).length).toBeGreaterThan(0)
  })
})

describe("SERVICES", () => {
  test("gives every image a folder that is on disk", () => {
    const absent = entries
      .filter(([, config]) => !isDirectory(join(ROOT, config.dir)))
      .map(([slug, config]) => `${slug}: ${config.dir}`)
    expect(absent).toEqual([])
  })

  test("gives every image stating extensions a file the writer finds", () => {
    const named = entries.flatMap(([slug, config]) =>
      config.extensionFile === undefined
        ? []
        : [{ slug, dir: config.dir, at: config.extensionFile }]
    )
    const absent = named
      .filter((one) => !existsSync(join(ROOT, one.dir, "deploy", one.at)))
      .map((one) => `${one.slug}: ${one.at}`)
    expect(named.length).toBeGreaterThan(0)
    expect(absent).toEqual([])
  })
})
