import {
  landingOf,
  NAMING_NONE,
  type Naming,
  specifiersIn,
} from "@akasha/code-system/code-specifier"
import { bodiesAt, reachingIn } from "@akasha/indexes/package-reaching"
import type { Shadow } from "@akasha/pages-system/shadow"
import {
  type Body,
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const MANIFEST = "package.json"

const PATTERN = "*"

const HELD = new WeakMap<Shadow, Naming>()

export function reachedBy(
  at: string,
  specifier: string,
  naming: Naming = NAMING_NONE
): string | null {
  if (specifier.startsWith("/")) return specifier
  return landingOf(at, specifier, naming)
}

function inside(landed: string): boolean {
  return landed === AKASHA || landed.startsWith(INSIDE)
}

export function foundIn(
  path: string,
  text: string,
  naming: Naming = NAMING_NONE
): readonly string[] {
  if (!path.startsWith(INSIDE)) return []
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    const landed = reachedBy(path, one, naming)
    if (landed === null || inside(landed)) continue
    said.push(
      `\`${one}\` reaches \`${landed}\` — an akasha file imports no file outside the akasha folder`
    )
  }
  return said
}

export function workspacesIn(text: string | null): readonly string[] {
  if (text === null) return []
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return []
  }
  const named = (held as { readonly workspaces?: unknown }).workspaces
  if (!Array.isArray(named)) return []
  const found: string[] = []
  for (const one of named) {
    if (typeof one !== "string" || one.includes(PATTERN)) continue
    found.push(`${one}/${MANIFEST}`)
  }
  return found
}

export function namingFor(root: string, shadow: Shadow): Naming {
  const found = HELD.get(shadow)
  if (found !== undefined) return found
  const bodyAt = bodiesAt(root)
  const named = [...shadow.index.everyPath(), ...workspacesIn(bodyAt(MANIFEST))]
  const made = reachingIn(named, shadow.index.filePropertiesAt(), bodyAt)
  HELD.set(shadow, made)
  return made
}

export function reasonsWith(naming: Naming): (given: Body) => readonly string[] {
  return overEachText((path, text) => foundIn(path, text, naming))
}

export const reasonsIn = reasonsWith(NAMING_NONE)

export const importsInside = judgingEach(TEXTS, (given, shadow) =>
  foundIn(given.path, given.text, namingFor(given.root, shadow))
)
