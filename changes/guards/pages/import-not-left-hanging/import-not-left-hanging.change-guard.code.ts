import {
  carriedIn,
  holdsAfter,
  judgingOver,
  takingIn,
} from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

function hangingIn(given: Guarding, gone: readonly string[]): string | null {
  for (const path of gone) {
    for (const importer of given.shadow.index.importersOf(path)) {
      if (!holdsAfter(given, importer)) continue
      return `\`${importer}\` imports \`${path}\`, and \`${path}\` holds no body after`
    }
  }
  return null
}

export function importNotLeftHanging(given: Guarding): string | null {
  return judgingOver(given, [...takingIn(given.said), ...carriedIn(given.said)], hangingIn)
}

export const runGuard: Guard = importNotLeftHanging
