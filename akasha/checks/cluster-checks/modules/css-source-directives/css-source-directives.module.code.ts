import { posix } from "node:path"
import type { TreeReading } from "../tree-reading/tree-reading.module.code.ts"

export type CssDirective = {
  readonly raw: string
  readonly pattern: string
  readonly line: number
  readonly negated: boolean
  readonly resolvedBase: string | null
}

export type CssFile = {
  readonly path: string
  readonly package: string | null
  readonly directives: readonly CssDirective[]
}

const SOURCE_DIRECTIVE_PATTERN = /@source\s+(not\s+)?"([^"]+)"/

const INLINE_DIRECTIVE_PATTERN = /@source\s+inline\s*\(/

export function globBase(pattern: string): string {
  const parts = pattern.split("/")
  const baseParts: string[] = []
  for (const part of parts) {
    if (part.includes("*") || part.includes("{") || part.includes("?")) break
    baseParts.push(part)
  }
  return baseParts.join("/")
}

export function resolveRepoRelative(fromDirRelPath: string, target: string): string | null {
  const joined = posix.normalize(posix.join(fromDirRelPath, target))
  if (joined === ".." || joined.startsWith("../")) return null
  return joined === "." ? "" : joined
}

export function extractSourceDirectives(
  content: string
): readonly Omit<CssDirective, "resolvedBase">[] {
  const out: Omit<CssDirective, "resolvedBase">[] = []
  const lines = content.split("\n")
  for (let at = 0; at < lines.length; at++) {
    const line = lines[at]
    if (line === undefined) continue
    if (INLINE_DIRECTIVE_PATTERN.test(line)) continue
    const matched = SOURCE_DIRECTIVE_PATTERN.exec(line)
    if (matched === null) continue
    const pattern = matched[2]
    if (pattern === undefined) continue
    out.push({
      raw: line.trim(),
      pattern,
      line: at + 1,
      negated: matched[1] !== undefined,
    })
  }
  return out
}

export function readCssFiles(
  reading: TreeReading,
  ownerOf: (relPath: string) => string | null
): readonly CssFile[] {
  const out: CssFile[] = []
  for (const relPath of reading.files()) {
    if (!relPath.endsWith(".css")) continue
    const content = reading.read(relPath)
    if (content === null) continue
    const dir = posix.dirname(relPath)
    const directives: CssDirective[] = []
    for (const found of extractSourceDirectives(content)) {
      const base = resolveRepoRelative(dir, globBase(found.pattern))
      directives.push({
        ...found,
        resolvedBase: base !== null && reading.hasPath(base) ? base : null,
      })
    }
    out.push({ path: relPath, package: ownerOf(relPath), directives })
  }
  return out
}
