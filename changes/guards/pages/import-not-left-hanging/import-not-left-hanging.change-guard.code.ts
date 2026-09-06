import {
  takingIn,
  unreadable,
} from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "../../../modules/change-guarding/change-guarding.module.types.ts"

function hangingIn(given: Guarding, taken: readonly string[]): string | null {
  for (const path of taken) {
    const importer = given.shadow.index.importersOf(path)[0]
    if (importer !== undefined) {
      return `\`${importer}\` imports \`${path}\`, and \`${path}\` is taken away`
    }
  }
  return null
}

export function importNotLeftHanging(given: Guarding): string | null {
  const taken = takingIn(given.said)
  if (taken.length === 0) return null
  try {
    return hangingIn(given, taken)
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = importNotLeftHanging
