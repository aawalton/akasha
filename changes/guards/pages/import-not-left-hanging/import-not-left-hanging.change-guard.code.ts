import {
  holdsAfter,
  judging,
} from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "../../../modules/change-guarding/change-guarding.module.types.ts"

function hangingIn(given: Guarding, taken: readonly string[]): string | null {
  for (const path of taken) {
    for (const importer of given.shadow.index.importersOf(path)) {
      if (!holdsAfter(given, importer)) continue
      return `\`${importer}\` imports \`${path}\`, and \`${path}\` is taken away`
    }
  }
  return null
}

export function importNotLeftHanging(given: Guarding): string | null {
  return judging(given, hangingIn)
}

export const runGuard: Guard = importNotLeftHanging
