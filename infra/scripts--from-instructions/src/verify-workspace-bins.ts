#!/usr/bin/env bun
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { codeModuleSync } from "../../../tools/lib/code-import.ts"
import { codeRoot } from "../../../tools/lib/code-root.ts"

const { expectedWorkspaceBinNames, findMissingBins } = codeModuleSync<{
  expectedWorkspaceBinNames: (repoRoot: string) => readonly string[]
  findMissingBins: (
    expected: readonly string[],
    present: ReadonlySet<string>
  ) => readonly string[]
}>("@shared/workspace-paths")

function main(): never {
  const repoRoot = codeRoot()
  const expected = expectedWorkspaceBinNames(repoRoot)
  const binDir = join(repoRoot, "node_modules", ".bin")
  const present = new Set<string>(existsSync(binDir) ? readdirSync(binDir) : [])
  const missing = findMissingBins(expected, present)
  if (missing.length > 0) {
    console.error(
      `verify-workspace-bins: ${missing.length}/${new Set(expected).size} workspace bin(s) missing from node_modules/.bin: ${missing.join(", ")}`
    )
    process.exit(1)
  }
  console.error(`verify-workspace-bins: all ${new Set(expected).size} workspace bins linked`)
  process.exit(0)
}

if (import.meta.main) main()
