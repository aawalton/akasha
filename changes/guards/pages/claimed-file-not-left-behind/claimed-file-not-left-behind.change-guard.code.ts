import { dirname } from "node:path"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  carriedIn,
  holdsAfter,
  takingIn,
  unreadable,
} from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "akasha/changes/modules/guarding/change-guarding.module.types.ts"
import { claimedIn } from "akasha/changes/modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  claimantOf,
  type Listing,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"
import { filesIn } from "akasha/pages/indexes/modules/tree-reading/tree-reading.module.code.ts"
import { pageNamed } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"

function folderOf(path: string): string {
  const at = dirname(path)
  return at === "." ? "" : at
}

function listingFor(given: Guarding): Listing {
  return (folder) => {
    const found = new Set([
      ...filesIn(given.shadow.root, folder),
      ...pathsIn(given.said).filter((one) => folderOf(one) === folder),
    ])
    return [...found].filter((one) => holdsAfter(given, one))
  }
}

function behindAt(given: Guarding, at: string, pageTypes: ReadonlySet<string>): string | null {
  const value = pageIn(given.before, at)
  if (value === null) return null
  const listing = listingFor(given)
  const fileProperties = given.shadow.index.filePropertiesAt()
  const folders = given.shadow.index.folderPropertiesAt()
  for (const one of claimedIn(given.before, at, value)) {
    if (one === at || !holdsAfter(given, one)) continue
    const page = claimantOf(listing, one, pageTypes, fileProperties, folders)
    if (page !== null && holdsAfter(given, page)) continue
    return `\`${at}\` is gone from that path, and \`${one}\` that page claims is left behind`
  }
  return null
}

function behindIn(given: Guarding, gone: readonly string[]): string | null {
  const pageTypes = given.shadow.index.pageTypesIn()
  for (const path of gone) {
    if (!pageNamed(path, pageTypes)) continue
    const why = behindAt(given, path, pageTypes)
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
