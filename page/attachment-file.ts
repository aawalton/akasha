import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { besideAt } from "@akasha/pages-system/page-file-name"

const PAGE_SUFFIX = ".md"

const UNCOMMITTED_INFIX = "uncommitted."

export function isAttachmentFile(relPath: string): boolean {
  return /\.(?:uncommitted\.)?attachment\.[a-z0-9]+$/.test(relPath)
}

export function isSourceAttachmentFile(relPath: string): boolean {
  return /\.[a-z0-9-]+\.(?:uncommitted\.)?attachment\.ts$/.test(relPath)
}

export function isAttachmentExtension(one: string): boolean {
  return /^[a-z0-9]+$/.test(one)
}

/**
 * The file an attachment stands in, beside the page that names it.
 *
 * A page is a markdown file under `pages/` or a TypeScript file under `akasha/`, and what stands
 * beside either one is named by dropping the page's own extension. `besideAt` is where akasha states
 * that rule, so a `.ts` page is asked of it rather than answered by a second copy of the rule here.
 */
function tailOf(extension: string, uncommitted: boolean): string {
  return `${uncommitted ? UNCOMMITTED_INFIX : ""}attachment.${extension}`
}

export function attachmentFileOf(
  relPath: string,
  key: string,
  extension: string,
  uncommitted = false
): string {
  const tail = tailOf(extension, uncommitted)
  const beside = besideAt(relPath, key, tail)
  if (beside !== null) return beside
  return `${relPath.replace(/\.md$/, "")}.${key}.${tail}`
}

/**
 * The same path, refusing one that names no page at all.
 *
 * What counts as a page is the question `attachmentFileOf` answers above, by asking `besideAt` and
 * falling back to the markdown rule where it will not answer. This asked a different question — did
 * the path end `.md` — which is the markdown half of that answer with the akasha half dropped, so
 * the gate in front of every read and write refused a `.ts` page under `akasha/` that the call two
 * functions up names correctly. The comment on that call already said a page is either kind.
 *
 * No day reaches here today: no `daily-tracking` property is attachment-typed, and a day that has
 * moved is written by `landAkashaDayPage` rather than through the markdown page writer that calls
 * this. It is one question asked in one way all the same, because that is what stops the two from
 * drifting apart before a day does reach it.
 */
export function attachmentPathFor(
  pagePath: string,
  key: string,
  extension: string,
  uncommitted = false
): string {
  const named =
    besideAt(pagePath, key, tailOf(extension, uncommitted)) !== null ||
    pagePath.endsWith(PAGE_SUFFIX)
  if (!named) {
    throw new Error(`an attachment stands beside a page, and '${pagePath}' is not one`)
  }
  return attachmentFileOf(pagePath, key, extension, uncommitted)
}

export function readAttachment(
  pagePath: string,
  key: string,
  extension: string,
  uncommitted = false
): string | null {
  try {
    return readFileSync(attachmentPathFor(pagePath, key, extension, uncommitted), "utf8")
  } catch {
    return null
  }
}

export function writeAttachment(
  pagePath: string,
  key: string,
  extension: string,
  text: string,
  uncommitted = false
): boolean {
  const path = attachmentPathFor(pagePath, key, extension, uncommitted)
  if (existsSync(path) && readFileSync(path, "utf8") === text) return false
  mkdirSync(dirname(path), { recursive: true })
  const scratch = `${path}.${process.pid}.part`
  writeFileSync(scratch, text, "utf8")
  renameSync(scratch, path)
  return true
}

export function removeAttachment(
  pagePath: string,
  key: string,
  extension: string,
  uncommitted = false
): boolean {
  const path = attachmentPathFor(pagePath, key, extension, uncommitted)
  if (!existsSync(path)) return false
  rmSync(path, { force: true })
  return true
}
