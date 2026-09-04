import { z } from "zod"

const GLOBAL_ASSIGN_RE = /^[ \t]*([A-Za-z_][A-Za-z0-9_]*)[ \t]*=[^=]/gm

const STRING_ID_MENTION_RE = /\b(SI_[A-Z0-9_]+)/g

const STRING_ID_CAPTURE = z.tuple([z.string().regex(/^SI_[A-Z0-9_]+$/)]).rest(z.string())

const MATCH_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): string | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    return z.string().parse(raw[1])
  })

export function isEsoGlobalName(name: string): boolean {
  if (/^ZO_[A-Za-z0-9_]*$/.test(name)) return true
  return /^[A-Z][A-Z0-9_]*$/.test(name)
}

export function extractGlobalNames(luaSource: string): readonly string[] {
  const names: string[] = []
  GLOBAL_ASSIGN_RE.lastIndex = 0
  for (
    let name = MATCH_SCHEMA.parse(GLOBAL_ASSIGN_RE.exec(luaSource));
    name !== null;
    name = MATCH_SCHEMA.parse(GLOBAL_ASSIGN_RE.exec(luaSource))
  ) {
    if (isEsoGlobalName(name)) names.push(name)
  }
  return names
}

export function extractStringIdNames(luaSource: string): readonly string[] {
  const names = new Set<string>()
  for (const match of luaSource.matchAll(STRING_ID_MENTION_RE)) {
    names.add(STRING_ID_CAPTURE.parse(match.slice(1))[0])
  }
  return [...names]
}
