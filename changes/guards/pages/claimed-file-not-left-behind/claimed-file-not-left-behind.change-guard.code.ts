import { pageNamed } from "@akasha/pages/page-file-name"
import {
  carriedIn,
  holdsAfter,
  takingIn,
  unreadable,
} from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

function behindAt(given: Guarding, at: string): string | null {
  const value = pageIn(given.before, at)
  if (value === null) return null
  for (const one of claimedIn(given.before, at, value)) {
    if (one === at || !holdsAfter(given, one)) continue
    if (given.shadow.index.listedByPath(one).length > 0) continue
    return `\`${at}\` is gone from that path, and \`${one}\` that page claims is left behind`
  }
  return null
}

function behindIn(given: Guarding, gone: readonly string[]): string | null {
  const pageTypes = given.shadow.index.pageTypesIn()
  for (const path of gone) {
    if (!pageNamed(path, pageTypes)) continue
    const why = behindAt(given, path)
    if (why !== null) return why
  }
  return null
}

export function claimedFileNotLeftBehind(given: Guarding): string | null {
  const gone = [...takingIn(given.said), ...carriedIn(given.said)]
  if (gone.length === 0) return null
  try {
    return behindIn(given, gone)
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = claimedFileNotLeftBehind
