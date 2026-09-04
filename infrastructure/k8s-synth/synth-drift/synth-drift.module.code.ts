import { relative } from "node:path"
import { tryRead } from "../generated-file/generated-file.module.code.ts"

export function firstDiffLine(actual: string, expected: string): string {
  const actualLines = actual.split("\n")
  const expectedLines = expected.split("\n")
  const limit = Math.max(actualLines.length, expectedLines.length)
  for (let i = 0; i < limit; i++) {
    if (actualLines[i] !== expectedLines[i]) {
      return `first diff at line ${i + 1} (on-disk: ${JSON.stringify(actualLines[i] ?? "<eof>")}, synth: ${JSON.stringify(expectedLines[i] ?? "<eof>")})`
    }
  }
  return "files differ but no per-line diff found (likely trailing-newline difference)"
}

export function describeDrift(absPath: string, expected: string, repoRoot: string): string | null {
  const existing = tryRead(absPath)
  const relPath = relative(repoRoot, absPath)
  if (existing === null)
    return `${relPath}: missing — synth.ts produces this file but it is not on disk`
  if (existing === expected) return null
  return `${relPath}: ${firstDiffLine(existing, expected)}`
}
