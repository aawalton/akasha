import { pageNamed } from "@akasha/pages/page-file-name"
import {
  holdsAfter,
  takingIn,
  unreadable,
} from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "../../../modules/change-guarding/change-guarding.module.types.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

function behindAt(given: Guarding, at: string): string | null {
  const value = pageIn(given.before, at)
  if (value === null) return null
  for (const one of claimedIn(given.before, at, value)) {
    if (one === at || !holdsAfter(given, one)) continue
    return `\`${at}\` is taken away, and \`${one}\` that page claims is left behind`
  }
  return null
}

function behindIn(given: Guarding, taken: readonly string[]): string | null {
  const pageTypes = given.shadow.index.pageTypesIn()
  for (const path of taken) {
    if (!pageNamed(path, pageTypes)) continue
    const why = behindAt(given, path)
    if (why !== null) return why
  }
  return null
}

export function claimedFileNotLeftBehind(given: Guarding): string | null {
  const taken = takingIn(given.said)
  if (taken.length === 0) return null
  try {
    return behindIn(given, taken)
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = claimedFileNotLeftBehind
