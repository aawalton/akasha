import {
  type Facing,
  generatedIn,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import {
  carriedIn,
  holdsAfter,
  judgingOver,
  takingIn,
} from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

function facingFor(given: Guarding): Facing {
  const index = given.shadow.index
  return {
    kindsUnder: (of) => index.kindsUnder(of),
    everyOfType: (kind) => index.everyOfType(kind),
    valueAt: (path) => index.pageByPath(path),
    carryingOf: (named) => index.carryingOf(named),
    filesIn: (folder) => index.filesIn(folder),
  }
}

function hangingIn(given: Guarding, gone: readonly string[]): string | null {
  const facing = facingFor(given)
  for (const path of gone) {
    for (const importer of given.shadow.index.importersOf(path)) {
      if (!holdsAfter(given, importer)) continue
      if (generatedIn(facing, importer)) continue
      return `\`${importer}\` imports \`${path}\`, and \`${path}\` holds no body after`
    }
  }
  return null
}

export function importNotLeftHanging(given: Guarding): string | null {
  return judgingOver(given, [...takingIn(given.said), ...carriedIn(given.said)], hangingIn)
}

export const runGuard: Guard = importNotLeftHanging
