import type { Found, Linted } from "@akasha/code/code-lint"
import type { Change } from "@akasha/pages/change"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export const CONFIG = "biome.json"

const NAMES = "**/*."

const SKIPPED = "!"

const ANYWHERE = "**/"

const MIRROR = "the mirror this change was written into"

const UNLOOKED = "A linter that could not look has verified nothing, so nothing was judged."

export function readsIn(said: Uint8Array | null): readonly string[] | null {
  if (said === null) return null
  const found: string[] = []
  try {
    const held = JSON.parse(new TextDecoder().decode(said)) as {
      files?: { includes?: readonly string[] }
    }
    for (const one of held.files?.includes ?? []) {
      if (one.startsWith(NAMES)) found.push(one.slice(NAMES.length - 1))
    }
  } catch {
    return null
  }
  return found.length === 0 ? null : found
}

export function skippedIn(said: Uint8Array | null): readonly string[] {
  if (said === null) return []
  try {
    const held = JSON.parse(new TextDecoder().decode(said)) as {
      files?: { includes?: readonly string[] }
    }
    return (held.files?.includes ?? [])
      .filter((one) => one.startsWith(SKIPPED))
      .map((one) => one.slice(SKIPPED.length))
  } catch {
    return []
  }
}

function skipping(path: string, glob: string): boolean {
  if (!glob.startsWith(ANYWHERE)) return path === glob || path.startsWith(`${glob}/`)
  const tail = glob.slice(ANYWHERE.length)
  if (tail.startsWith("*.")) return path.endsWith(tail.slice(1))
  return path === tail || path.endsWith(`/${tail}`) || path.includes(`/${tail}/`)
}

export function lookedAt(
  path: string,
  reads: readonly string[] | null,
  skips: readonly string[] = []
): boolean {
  if (skips.some((one) => skipping(path, one))) return false
  return reads === null || reads.some((one) => path.endsWith(one))
}

export function carriedIn(
  change: Change,
  reads: readonly string[] | null,
  skips: readonly string[] = []
): readonly string[] {
  const held = new Set<string>()
  for (const one of change.changed) {
    if (!lookedAt(one, reads, skips)) continue
    if (change.after(one) === null) continue
    held.add(one)
  }
  return [...held].sort()
}

export function outsideOf(said: string, root: string, named: string = MIRROR): string {
  return said.replaceAll(`${root}/`, "").replaceAll(root, named)
}

export function reasonOf(one: Found): string {
  return `\`${one.rule}\` at line ${one.line}, column ${one.column} — ${one.said}`
}

export function judgedOf(
  linted: Linted,
  first: string,
  root: string,
  named: string = MIRROR
): readonly Judged[] {
  if (linted.failed !== null) {
    return [{ path: first, reason: `${outsideOf(linted.failed, root, named)}. ${UNLOOKED}` }]
  }
  return linted.found.map((one) => ({
    path: one.path,
    reason: outsideOf(reasonOf(one), root, named),
  }))
}
