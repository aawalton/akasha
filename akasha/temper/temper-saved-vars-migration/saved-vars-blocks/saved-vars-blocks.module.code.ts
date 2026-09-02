const TOP_LEVEL_CLOSE = /^\}/

const TOP_LEVEL_ASSIGN = /^[A-Za-z_][A-Za-z0-9_]*[ \t]*=/

export function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function assignmentOf(global: string): RegExp {
  return new RegExp(`^${escapeRegExp(global)}[ \\t]*=`)
}

export type RenameResult = {
  readonly content: string
  readonly renamedCount: number
}

export function renameGlobals(
  content: string,
  renames: readonly (readonly [RegExp, string])[]
): RenameResult {
  let renamed = content
  let renamedCount = 0
  for (const [pattern, replacement] of renames) {
    const next = renamed.replace(pattern, replacement)
    if (next !== renamed) renamedCount += 1
    renamed = next
  }
  return { content: renamed, renamedCount }
}

export function extractTopLevelBlock(content: string, global: string): string | null {
  const lines = content.split("\n")
  const opensAt = lines.findIndex((line) => assignmentOf(global).test(line))
  if (opensAt === -1) return null
  for (let at = opensAt + 1; at < lines.length; at += 1) {
    const line = lines[at] ?? ""
    if (TOP_LEVEL_CLOSE.test(line)) return lines.slice(opensAt, at + 1).join("\n")
    if (TOP_LEVEL_ASSIGN.test(line)) return lines.slice(opensAt, at).join("\n")
  }
  return lines.slice(opensAt).join("\n")
}

export function extractOneLineOrBlock(lines: readonly string[], opensAt: number): string {
  for (let at = opensAt + 1; at < lines.length; at += 1) {
    const line = lines[at] ?? ""
    if (TOP_LEVEL_CLOSE.test(line)) return lines.slice(opensAt, at + 1).join("\n")
    if (TOP_LEVEL_ASSIGN.test(line)) return lines[opensAt] ?? ""
  }
  return lines[opensAt] ?? ""
}

export type ExtractResult = {
  readonly blocks: readonly string[]
  readonly present: readonly string[]
  readonly missing: readonly string[]
}

export function extractMemberGlobalBlocks(
  mergedContent: string,
  globals: readonly string[]
): ExtractResult {
  const lines = mergedContent.split("\n")
  const blocks: string[] = []
  const present: string[] = []
  const missing: string[] = []
  for (const global of globals) {
    const opensAt = lines.findIndex((line) => assignmentOf(global).test(line))
    if (opensAt === -1) {
      missing.push(global)
      continue
    }
    blocks.push(extractOneLineOrBlock(lines, opensAt))
    present.push(global)
  }
  return { blocks, present, missing }
}

export type AppendResult =
  | { readonly kind: "appended"; readonly content: string }
  | { readonly kind: "already-appended" }
  | { readonly kind: "absorbed-global-absent" }

export function appendGlobalToTarget(
  absorbedContent: string,
  absorbedGlobal: string,
  targetContent: string
): AppendResult {
  const block = extractTopLevelBlock(absorbedContent, absorbedGlobal)
  if (block === null) return { kind: "absorbed-global-absent" }

  const alreadyThere = new RegExp(`^${escapeRegExp(absorbedGlobal)}[ \\t]*=`, "m")
  if (alreadyThere.test(targetContent)) return { kind: "already-appended" }

  const eol = targetContent.includes("\r\n") ? "\r\n" : "\n"
  const base = targetContent.endsWith(eol) ? targetContent : `${targetContent}${eol}`
  return { kind: "appended", content: `${base}${block}${eol}` }
}
