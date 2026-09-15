import {
  landingOf,
  NAMING_NONE,
  type Naming,
  specifiersIn,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"

const OUTSIDE = ".."

export function importsIn(
  body: string,
  path: string,
  naming: Naming = NAMING_NONE
): readonly string[] {
  const found: string[] = []
  for (const one of specifiersIn(path, body)) {
    const landed = landingOf(path, one, naming)
    if (landed === null || landed === OUTSIDE || landed.startsWith(`${OUTSIDE}/`)) continue
    found.push(landed)
  }
  return found
}
