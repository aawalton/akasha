import {
  landingOf,
  NAMING_NONE,
  type Naming,
  specifiersIn,
} from "@akasha/code-system/code-specifier"
import { bodiesAt, reachingAt } from "@akasha/indexes/package-reaching"
import type { Shadow } from "@akasha/pages-system/shadow"
import {
  type Body,
  judgingEach,
  overEachText,
  TEXTS,
} from "../../change-walking/change-walking.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

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

export function namingFor(root: string, shadow: Shadow): Naming {
  const found = HELD.get(shadow)
  if (found !== undefined) return found
  const made = reachingAt(shadow.reading, bodiesAt(root))
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
