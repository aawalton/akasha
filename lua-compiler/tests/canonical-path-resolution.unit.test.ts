import { describe, expect, it } from "bun:test"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import {
  findProgramFileByCanonicalPath,
  type ProgramFileLookup,
} from "../src/transpilation/resolve-helpers"

function fakeProgram(fileNames: readonly string[]): ProgramFileLookup {
  const byName = new Map(fileNames.map((fn) => [fn, { fileName: fn }]))
  return {
    getSourceFile: (fn: string) => byName.get(fn),
    getSourceFiles: () => [...byName.values()],
  }
}

function fakeRealpath(p: string): string | undefined {
  return p.startsWith("/home/") ? p.replace(/^\/home\//, "/var/home/") : p
}

describe("findProgramFileByCanonicalPath (#12969 canonicalization fall-through)", () => {
  it("recovers via the fast path when the program holds the realpath form", () => {
    const program = fakeProgram(["/var/home/walton/code/pkg/src/text.ts"])
    const result = findProgramFileByCanonicalPath(
      "/home/walton/code/pkg/src/text.ts",
      program,
      fakeRealpath
    )
    expect(result).toBe("/var/home/walton/code/pkg/src/text.ts")
  })

  it("recovers via the scan path when the program holds the symlink form", () => {
    const program = fakeProgram(["/home/walton/code/pkg/src/text.ts"])
    const result = findProgramFileByCanonicalPath(
      "/var/home/walton/code/pkg/src/text.ts",
      program,
      fakeRealpath
    )
    expect(result).toBe("/home/walton/code/pkg/src/text.ts")
  })

  it("returns the program's own fileName, not the divergent resolved string", () => {
    const program = fakeProgram(["/var/home/walton/code/pkg/src/text.ts"])
    const result = findProgramFileByCanonicalPath(
      "/home/walton/code/pkg/src/text.ts",
      program,
      fakeRealpath
    )
    expect(result).not.toBe("/home/walton/code/pkg/src/text.ts")
  })

  it("returns undefined when no program file is the same physical file (invariant)", () => {
    const program = fakeProgram(["/var/home/walton/code/pkg/src/other.ts"])
    const result = findProgramFileByCanonicalPath(
      "/home/walton/code/pkg/src/text.ts",
      program,
      fakeRealpath
    )
    expect(result).toBeUndefined()
  })

  it("does not match on basename alone when realpaths differ", () => {
    const program = fakeProgram(["/var/home/walton/code/pkg/a/text.ts"])
    const result = findProgramFileByCanonicalPath(
      "/home/walton/code/pkg/b/text.ts",
      program,
      fakeRealpath
    )
    expect(result).toBeUndefined()
  })

  it("returns undefined when the resolved file cannot be realpathed", () => {
    const program = fakeProgram(["/var/home/walton/code/pkg/src/text.ts"])
    const result = findProgramFileByCanonicalPath(
      "/home/walton/code/pkg/src/text.ts",
      program,
      () => undefined
    )
    expect(result).toBeUndefined()
  })

  it("recovers against a real on-disk symlink using the default realpath", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-canon-"))
    try {
      const realDir = path.join(root, "real")
      fs.mkdirSync(realDir, { recursive: true })
      const realFile = path.join(realDir, "text.ts")
      fs.writeFileSync(realFile, "export const x = 1\n", "utf8")

      const linkDir = path.join(root, "link")
      fs.symlinkSync(realDir, linkDir)
      const linkFile = path.join(linkDir, "text.ts")

      const canonical = fs.realpathSync(realFile)
      const program = fakeProgram([canonical])

      const result = findProgramFileByCanonicalPath(linkFile, program)
      expect(result).toBe(canonical)
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  })
})
