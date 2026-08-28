import { posix } from "node:path"
import { listWorkspaceDirs } from "@shared/workspace-paths"
import { z } from "zod"
import { listFiles, readText, writeText } from "./fs.ts"
import type { Logger } from "./logger.ts"
import { applyBoundaryMatch } from "./rename-primitives.ts"
import type { WorkspaceMove } from "./types.ts"

const FRAGMENT_INDEX_SCHEMA = z.object({ index: z.number() }).passthrough()

function isMarkdown(path: string): boolean {
  return path.endsWith(".md")
}

function isClaudeMd(path: string): boolean {
  return path.endsWith("/CLAUDE.md") || path === "CLAUDE.md"
}

export function isPackageDoc(path: string, workspaceDirs: readonly string[]): boolean {
  if (!path.includes("/docs/")) return false
  return workspaceDirs.some((dir) => path.startsWith(`${dir}/`))
}

function listTargetDocs(root: string): readonly string[] {
  const workspaceDirs = listWorkspaceDirs(root)
  const all = listFiles(root, ".")
  const set = new Set<string>()
  for (const path of all) {
    if (!isMarkdown(path)) continue
    if (isClaudeMd(path) || isPackageDoc(path, workspaceDirs)) {
      set.add(path)
    }
  }
  return [...set].sort()
}

function remapPath(p: string, from: string, to: string): string {
  if (p === from) return to
  if (p.startsWith(`${from}/`)) return `${to}${p.slice(from.length)}`
  return p
}

const EXTERNAL_PREFIX = /^(?:https?:|mailto:|ftp:|#|\/|\?)/
const FRAGMENT_OR_QUERY = /[#?]/

function splitFragment(link: string): { path: string; tail: string } {
  const result = FRAGMENT_INDEX_SCHEMA.safeParse(FRAGMENT_OR_QUERY.exec(link))
  if (!result.success) return { path: link, tail: "" }
  const { index } = result.data
  return { path: link.slice(0, index), tail: link.slice(index) }
}

function remapRelativeLink(
  fileRelPath: string,
  linkUrl: string,
  move: WorkspaceMove
): string | null {
  const raw = linkUrl.trim()
  if (raw === "" || EXTERNAL_PREFIX.test(raw)) return null

  const { path: pathPart, tail } = splitFragment(raw)
  if (pathPart === "") return null

  const filePre = remapPath(fileRelPath, move.new, move.old)
  const fileDirPre = posix.dirname(filePre)
  const preResolved = posix.normalize(posix.join(fileDirPre, pathPart))

  const postResolved = remapPath(preResolved, move.old, move.new)

  if (filePre === fileRelPath && preResolved === postResolved) return null

  const fileDirNew = posix.dirname(fileRelPath)
  let rel = posix.relative(fileDirNew, postResolved)
  if (rel === "") rel = "."
  if (!rel.startsWith(".")) rel = `./${rel}`
  return rel + tail
}

const INLINE_LINK = /(!?\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g
const REFERENCE_LINK = /^([ \t]*\[[^\]]+\]:[ \t]+)(\S+)/gm

export function rewriteMarkdownLinks(
  fileRelPath: string,
  content: string,
  move: WorkspaceMove
): { text: string; count: number } {
  let count = 0
  const rewriteLink = (link: string): string => {
    const next = remapRelativeLink(fileRelPath, link, move)
    if (next === null || next === link) return link
    count += 1
    return next
  }

  let text = content.replace(INLINE_LINK, (_m, open: string, link: string, close: string) => {
    return `${open}${rewriteLink(link)}${close}`
  })
  text = text.replace(REFERENCE_LINK, (_m, open: string, link: string) => {
    return `${open}${rewriteLink(link)}`
  })
  return { text, count }
}

export function rewriteDocs(root: string, move: WorkspaceMove, log: Logger): undefined {
  const targets = listTargetDocs(root)
  log.info(`\n[docs-rewrites] scanning ${targets.length} markdown files`)

  let filesTouched = 0
  let totalReplacements = 0

  for (const file of targets) {
    const original = readText(root, file)
    let text = original
    let count = 0

    if (move.old !== move.new) {
      const pathRes = applyBoundaryMatch(text, move.old, move.new)
      text = pathRes.text
      count += pathRes.count
    }

    if (move.oldName !== move.newName) {
      const nameRes = applyBoundaryMatch(text, move.oldName, move.newName)
      text = nameRes.text
      count += nameRes.count
    }

    if (move.old !== move.new) {
      const linkRes = rewriteMarkdownLinks(file, text, move)
      text = linkRes.text
      count += linkRes.count
    }

    if (count === 0 || text === original) continue

    writeText(root, file, text)
    filesTouched += 1
    totalReplacements += count
    log.info(`  ${file} (${count} replacement(s))`)
  }

  log.info(`[docs-rewrites] touched ${filesTouched} file(s), ${totalReplacements} replacement(s)`)
}
