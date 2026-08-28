import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"

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

export function attachmentFileOf(
  relPath: string,
  key: string,
  extension: string,
  uncommitted = false
): string {
  const stem = relPath.replace(/\.md$/, "")
  return `${stem}.${key}.${uncommitted ? UNCOMMITTED_INFIX : ""}attachment.${extension}`
}

export function attachmentPathFor(
  pagePath: string,
  key: string,
  extension: string,
  uncommitted = false
): string {
  if (!pagePath.endsWith(PAGE_SUFFIX)) {
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
