import { spelledIn } from "@akasha/code-system/code-specifier"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"

const PARTED_BY = "/"

const MANIFEST = "package.json"

const CODE = [".ts", ".tsx"]

const QUOTED = /"([^"\\]*)"/g

export type Packaging = {
  readonly was: string
  readonly now: string
  readonly at: string
  readonly folder: string
}

export type Asked = { readonly packaging: Packaging } | { readonly refused: string }

export function namedAs(spelt: string, was: string, now: string): string | null {
  if (spelt !== was && !spelt.startsWith(`${was}${PARTED_BY}`)) return null
  return `${now}${spelt.slice(was.length)}`
}

export function nameIn(text: string): string | null {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const named = (read as Record<string, unknown>).name
  return typeof named === "string" ? named : null
}

export function packagingFor(
  manifests: ReadonlyMap<string, string>,
  was: string,
  now: string
): Asked {
  if (was === now) return { refused: `\`${was}\` is the name it already carries` }
  let at: string | null = null
  for (const [path, text] of manifests) {
    const named = nameIn(text)
    if (named === now) return { refused: `\`${now}\` is the name ${path} already carries` }
    if (named === was) at = path
  }
  if (at === null) {
    return { refused: `no manifest under \`akasha/\` calls its package \`${was}\`` }
  }
  return { packaging: { was, now, at, folder: at.slice(0, -(MANIFEST.length + 1)) } }
}

export function bodyRespeltIn(path: string, text: string, was: string, now: string): string | null {
  const spots: (readonly [Spot, string])[] = []
  for (const one of spelledIn(path, text)) {
    const said = namedAs(one.text, was, now)
    if (said === null) continue
    spots.push([{ start: one.start, end: one.end }, JSON.stringify(said)])
  }
  return spots.length === 0 ? null : splicedIn(text, spots)
}

export function manifestRespeltIn(text: string, was: string, now: string): string | null {
  let found = false
  const next = text.replace(QUOTED, (whole, inner: string) => {
    const said = namedAs(inner, was, now)
    if (said === null) return whole
    found = true
    return JSON.stringify(said)
  })
  return found ? next : null
}

export function respeltIn(path: string, text: string, was: string, now: string): string | null {
  if (!text.includes(was)) return null
  if (path.endsWith(MANIFEST)) return manifestRespeltIn(text, was, now)
  if (!CODE.some((one) => path.endsWith(one))) return null
  return bodyRespeltIn(path, text, was, now)
}

export function renamingOver(
  one: Packaging,
  paths: readonly string[],
  textOf: (path: string) => string | null
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const path of [...paths].sort()) {
    const text = textOf(path)
    if (text === null) continue
    const next = respeltIn(path, text, one.was, one.now)
    if (next !== null && next !== text) found.set(path, next)
  }
  return found
}
