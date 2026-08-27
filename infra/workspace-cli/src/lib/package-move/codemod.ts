import { listFiles, readText, writeText } from "./fs"
import type { Logger } from "./logger"
import type { WorkspaceMove } from "./types"

const JS_LIKE_EXTS = [".ts", ".tsx", ".js", ".jsx", ".cjs", ".mjs"]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function buildImportRegexes(oldName: string): readonly RegExp[] {
  const escaped = escapeRegex(oldName)
  const subpath = `((?:/[^"'\`]*)?)`
  const quotedTail = (q: string) => `${escaped}${subpath}${q}`
  return [
    new RegExp(`(from\\s+)(["'\`])${quotedTail("\\2")}`, "g"),
    new RegExp(`(^\\s*import\\s+)(["'\`])${quotedTail("\\2")}`, "gm"),
    new RegExp(`(require\\s*\\(\\s*)(["'\`])${quotedTail("\\2")}`, "g"),
    new RegExp(`(import\\s*\\(\\s*)(["'\`])${quotedTail("\\2")}`, "g"),
  ]
}

export function rewriteImportString(
  contents: string,
  oldName: string,
  newName: string
): { next: string; replacements: number } {
  if (oldName === newName) return { next: contents, replacements: 0 }
  const patterns = buildImportRegexes(oldName)
  let next = contents
  let replacements = 0
  for (const pattern of patterns) {
    next = next.replace(pattern, (_match, prefix: string, quote: string, subpath: string) => {
      replacements += 1
      return `${prefix}${quote}${newName}${subpath}${quote}`
    })
  }
  return { next, replacements }
}

export function rewriteImports(root: string, move: WorkspaceMove, log: Logger): readonly string[] {
  if (move.oldName === move.newName) {
    log.info("[codemod] no name rename — skipping imports")
    return []
  }

  const files = listFiles(root, ".").filter((path) =>
    JS_LIKE_EXTS.some((ext) => path.endsWith(ext))
  )

  const touched: string[] = []
  let totalReplacements = 0
  for (const path of files) {
    const before = readText(root, path)
    const { next, replacements } = rewriteImportString(before, move.oldName, move.newName)
    if (replacements === 0 || next === before) continue
    writeText(root, path, next)
    touched.push(path)
    totalReplacements += replacements
  }

  log.info(
    `[codemod] rewrote ${totalReplacements} specifier(s) across ${touched.length} file(s) ` +
      `(${files.length} file(s) scanned)`
  )
  return touched
}
