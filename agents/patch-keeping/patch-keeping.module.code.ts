import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { exclusively } from "@akasha/file-system/exclusive"
import { uncommittedBesideAt } from "@akasha/pages-system/page-file-name"

const SLUG = "patch"

const HELD = "diff"

const WRITING = ".writing"

export function patchAt(page: string): string | null {
  return uncommittedBesideAt(page, SLUG, HELD)
}

function readAt(full: string): string | null {
  if (!existsSync(full)) return null
  try {
    const held = readFileSync(full, "utf8")
    return held === "" ? null : held
  } catch {
    return null
  }
}

function putAt(full: string, text: string): undefined {
  const near = `${full}${WRITING}`
  writeFileSync(near, text)
  renameSync(near, full)
}

export function patchIn(root: string, page: string): string | null {
  const at = patchAt(page)
  return at === null ? null : readAt(join(root, at))
}

export function keptPatch(
  root: string,
  page: string,
  act: (held: string | null) => string | null
): boolean {
  const at = patchAt(page)
  if (at === null) return false
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, () => {
    const next = act(readAt(full))
    if (next === null || next === "") rmSync(full, { force: true })
    else putAt(full, next)
  })
  return true
}

export function keepPatch(root: string, page: string, text: string): boolean {
  return keptPatch(root, page, () => text)
}

export function dropPatch(root: string, page: string): boolean {
  return keptPatch(root, page, () => null)
}
