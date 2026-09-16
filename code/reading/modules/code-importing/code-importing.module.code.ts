import {
  landingOf,
  NAMING_NONE,
  type Naming,
  placedIn,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"

const OUTSIDE = ".."

export type Importing = {
  readonly at: string
  readonly typed: boolean
  readonly deferred: boolean
}

export function importingIn(
  body: string,
  path: string,
  naming: Naming = NAMING_NONE
): readonly Importing[] {
  const found: Importing[] = []
  for (const one of placedIn(path, body)) {
    const landed = landingOf(path, one.text, naming)
    if (landed === null || landed === OUTSIDE || landed.startsWith(`${OUTSIDE}/`)) continue
    found.push({ at: landed, typed: one.typed, deferred: one.deferred })
  }
  return found
}

export function importsIn(
  body: string,
  path: string,
  naming: Naming = NAMING_NONE
): readonly string[] {
  return importingIn(body, path, naming).map((one) => one.at)
}
