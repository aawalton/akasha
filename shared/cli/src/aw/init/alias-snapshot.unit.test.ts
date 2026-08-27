import { describe, expect, it } from "bun:test"
import { rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { readAliasSnapshot } from "./alias-snapshot"

function withTempSnapshot<T>(contents: string | null, fn: (path: string) => T): T {
  const path = join(
    tmpdir(),
    `alias-read-test-${Date.now()}-${Math.random().toString(36).slice(2)}.json`
  )
  try {
    if (contents !== null) writeFileSync(path, contents)
    return fn(path)
  } finally {
    rmSync(path, { force: true })
  }
}

describe("readAliasSnapshot", () => {
  it("returns [] when the file is absent (fresh / offline workstation)", () => {
    const result = withTempSnapshot(null, (path) => readAliasSnapshot(path))
    expect(result).toEqual([])
  })

  it("returns [] on unparseable JSON rather than throwing", () => {
    const result = withTempSnapshot("{not json", (path) => readAliasSnapshot(path))
    expect(result).toEqual([])
  })

  it("returns [] when the top level is not an array", () => {
    const result = withTempSnapshot('{"account":"a","aliasIndex":1}', (path) =>
      readAliasSnapshot(path)
    )
    expect(result).toEqual([])
  })

  it("parses valid entries and sorts by aliasIndex", () => {
    const json = JSON.stringify([
      { account: "b", aliasIndex: 2 },
      { account: "a", aliasIndex: 1 },
    ])
    const result = withTempSnapshot(json, (path) => readAliasSnapshot(path))
    expect(result).toEqual([
      { account: "a", aliasIndex: 1 },
      { account: "b", aliasIndex: 2 },
    ])
  })

  it("drops malformed entries (wrong types, missing keys, non-integer index)", () => {
    const json = JSON.stringify([
      { account: "good", aliasIndex: 1 },
      { account: "", aliasIndex: 2 },
      { account: "noindex" },
      { account: "frac", aliasIndex: 2.5 },
      { aliasIndex: 3 },
      "nope",
    ])
    const result = withTempSnapshot(json, (path) => readAliasSnapshot(path))
    expect(result).toEqual([{ account: "good", aliasIndex: 1 }])
  })
})
