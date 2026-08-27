import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { writeFileAtomic, writeFileAtomicSync } from "./atomic-write"

describe("atomic-write", () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "atomic-write-"))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const leftovers = () => readdirSync(dir).filter((name) => name.includes(".tmp-"))

  describe("writeFileAtomicSync", () => {
    test("creates the target file with the given content", () => {
      const path = join(dir, "fresh.json")
      writeFileAtomicSync(path, '{"a":1}')
      expect(readFileSync(path, "utf8")).toBe('{"a":1}')
    })

    test("replaces an existing file", () => {
      const path = join(dir, "existing.json")
      writeFileAtomicSync(path, "old")
      writeFileAtomicSync(path, "new")
      expect(readFileSync(path, "utf8")).toBe("new")
    })

    test("writes Uint8Array data", () => {
      const path = join(dir, "binary.bin")
      writeFileAtomicSync(path, new Uint8Array([1, 2, 3]))
      expect([...readFileSync(path)]).toEqual([1, 2, 3])
    })

    test("applies the mode option", () => {
      const path = join(dir, "secret.json")
      writeFileAtomicSync(path, "{}", { mode: 0o600 })
      expect(statSync(path).mode & 0o777).toBe(0o600)
    })

    test("leaves no temp file behind on success", () => {
      writeFileAtomicSync(join(dir, "clean.json"), "x")
      expect(leftovers()).toEqual([])
    })

    test("cleans up the temp file and rethrows when the rename fails", () => {
      const target = join(dir, "iam-a-dir")
      mkdirSync(target)
      mkdirSync(join(target, "occupied"))
      expect(() => writeFileAtomicSync(target, "x")).toThrow()
      expect(leftovers()).toEqual([])
    })
  })

  describe("writeFileAtomic", () => {
    test("creates the target file with the given content", async () => {
      const path = join(dir, "fresh.json")
      await writeFileAtomic(path, '{"a":1}')
      expect(readFileSync(path, "utf8")).toBe('{"a":1}')
    })

    test("replaces an existing file", async () => {
      const path = join(dir, "existing.json")
      await writeFileAtomic(path, "old")
      await writeFileAtomic(path, "new")
      expect(readFileSync(path, "utf8")).toBe("new")
    })

    test("writes Uint8Array data with a mode", async () => {
      const path = join(dir, "binary.bin")
      await writeFileAtomic(path, new Uint8Array([9, 8]), { mode: 0o644 })
      expect([...readFileSync(path)]).toEqual([9, 8])
      expect(statSync(path).mode & 0o777).toBe(0o644)
    })

    test("leaves no temp file behind on success", async () => {
      await writeFileAtomic(join(dir, "clean.json"), "x")
      expect(leftovers()).toEqual([])
    })

    test("cleans up the temp file and rethrows when the rename fails", async () => {
      const target = join(dir, "iam-a-dir")
      mkdirSync(target)
      mkdirSync(join(target, "occupied"))
      await expect(writeFileAtomic(target, "x")).rejects.toThrow()
      expect(leftovers()).toEqual([])
    })

    test("does not invoke onRetry on the happy path", async () => {
      const calls: string[] = []
      await writeFileAtomic(join(dir, "quiet.json"), "x", {
        retryOnBusy: true,
        onRetry: (m) => calls.push(m),
      })
      expect(calls).toEqual([])
    })
  })
})
