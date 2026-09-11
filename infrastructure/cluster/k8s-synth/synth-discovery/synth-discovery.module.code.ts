import { isAbsolute, join, relative } from "node:path"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const MANIFEST = "manifest"

const CODE = "code"

const NON_IDENTIFIER_COMPONENTS: ReadonlySet<string> = new Set(["k8s", "deploy", "src", "synth.ts"])

export function pathHasComponent(relPath: string, target: string): boolean {
  for (const component of relPath.split("/")) {
    if (NON_IDENTIFIER_COMPONENTS.has(component)) continue
    if (component === target) return true
  }
  return false
}

export function manifestCodePaths(repoRoot: string): readonly string[] {
  const found: string[] = []
  for (const one of valuesOfType(repoRoot, MANIFEST)) {
    const held = textAt(one.value, CODE)
    const beside = held === null ? null : besideAt(one.path, CODE, held)
    if (beside === null) continue
    found.push(isAbsolute(beside) ? relative(repoRoot, beside) : beside)
  }
  return found
}

export function discoverSynthFiles(
  repoRoot: string,
  pkgFilter?: string | undefined
): readonly string[] {
  const matches = new Set<string>()
  for (const rel of manifestCodePaths(repoRoot)) {
    if (pkgFilter !== undefined && !pathHasComponent(rel, pkgFilter)) continue
    matches.add(join(repoRoot, rel))
  }
  return [...matches].sort()
}
