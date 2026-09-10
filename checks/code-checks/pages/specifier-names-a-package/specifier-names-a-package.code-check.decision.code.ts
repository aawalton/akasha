import { specifiersIn } from "@akasha/code/code-specifier"
import { calledIn } from "@akasha/code/package-manifest"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import {
  bodyOf,
  overEachFile,
  textIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { manifestsIn } from "../package-reached-where-named/package-reached-where-named.code-check.decision.code.ts"

const PARTED_BY = "/"

const SCOPED = "@"

const NAMED = /[a-zA-Z0-9._-]/

const SAID = "a specifier reaching by package name names a package a manifest states"

export function packageOf(specifier: string): string | null {
  if (!specifier.startsWith(SCOPED)) return null
  const mark = specifier.indexOf(PARTED_BY)
  if (mark < 0) return null
  const rest = specifier.indexOf(PARTED_BY, mark + 1)
  return rest < 0 ? specifier : specifier.slice(0, rest)
}

export function scopesOf(names: Iterable<string>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of names) {
    if (!one.startsWith(SCOPED)) continue
    const mark = one.indexOf(PARTED_BY)
    if (mark > 0) found.add(one.slice(0, mark))
  }
  return found
}

export function suspectedIn(
  text: string,
  scopes: ReadonlySet<string>,
  names: ReadonlySet<string>
): boolean {
  for (const scope of scopes) {
    const opening = `${scope}${PARTED_BY}`
    let at = text.indexOf(opening)
    while (at >= 0) {
      let end = at + opening.length
      while (end < text.length && NAMED.test(text.charAt(end))) end += 1
      if (!names.has(text.slice(at, end))) return true
      at = text.indexOf(opening, end)
    }
  }
  return false
}

export function strandedIn(
  path: string,
  text: string,
  names: ReadonlySet<string>,
  scopes: ReadonlySet<string>
): readonly string[] {
  if (!suspectedIn(text, scopes, names)) return []
  const said: string[] = []
  const seen = new Set<string>()
  for (const one of specifiersIn(path, text)) {
    const named = packageOf(one)
    if (named === null || names.has(named) || seen.has(named)) continue
    if (!scopes.has(named.slice(0, named.indexOf(PARTED_BY)))) continue
    seen.add(named)
    said.push(`spells \`${named}\`, which no manifest states as a package name — ${SAID}`)
  }
  return said
}

export function statedOver(change: Change, shadow: Shadow): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of manifestsIn(shadow)) {
    const named = calledIn(textIn(change, one.at))
    if (named !== null) found.add(named)
  }
  return found
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const names = statedOver(change, shadow)
  const scopes = scopesOf(names)
  if (scopes.size === 0) return []
  return overEachFile(change, (given) =>
    textNamed(given.path) ? strandedIn(given.path, bodyOf(given), names, scopes) : []
  )
}
