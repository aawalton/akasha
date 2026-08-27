import { describe, expect, it } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { readUncommitted, uncommittedPathFor, writeUncommitted } from "./uncommitted.ts"

function inScratch<T>(run: (pagePath: string) => T): T {
  const dir = mkdtempSync(join(tmpdir(), "uncommitted-"))
  try {
    return run(join(dir, "thing.md"))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe("writeUncommitted", () => {
  it("quotes a string a reader would otherwise resolve to a number", () => {
    inScratch((pagePath) => {
      writeUncommitted(pagePath, { "proxy-process": "3019009-26697286" })
      const raw = readFileSync(uncommittedPathFor(pagePath), "utf8")
      expect(raw).toContain('proxy-process: "3019009-26697286"')
    })
  })

  it("reads back the whole value rather than the half before the hyphen", () => {
    inScratch((pagePath) => {
      writeUncommitted(pagePath, { "proxy-process": "3019009-26697286" })
      expect(readUncommitted(pagePath)?.["proxy-process"]).toBe("3019009-26697286")
    })
  })

  it("leaves a number a number, since a reader wanting a port refuses a string", () => {
    inScratch((pagePath) => {
      writeUncommitted(pagePath, { "proxy-port": 42033 })
      expect(readUncommitted(pagePath)?.["proxy-port"]).toBe(42033)
    })
  })

  it("keeps a value on the one line it was written as, however long", () => {
    inScratch((pagePath) => {
      const long = "x".repeat(200)
      writeUncommitted(pagePath, { note: long })
      expect(readFileSync(uncommittedPathFor(pagePath), "utf8")).toContain(`note: "${long}"`)
    })
  })

  it("keeps a nested value readable too", () => {
    inScratch((pagePath) => {
      writeUncommitted(pagePath, { turn: { value: "3019009-26697286", at: 12 } })
      const held = readUncommitted(pagePath)?.["turn"] as Record<string, unknown>
      expect(held["value"]).toBe("3019009-26697286")
      expect(held["at"]).toBe(12)
    })
  })
})