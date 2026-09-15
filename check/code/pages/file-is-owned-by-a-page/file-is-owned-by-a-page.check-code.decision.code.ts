import type { Body } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { claimantIn } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { underIndex } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const UNOWNED = "belongs to no page, so nothing says what this file is for"

const readingOf = heldPerShadow((shadow: Shadow) => readingIn(shadow.root))

export function ownerOf(path: string, shadow: Shadow): string | null {
  return claimantIn(readingOf(shadow), path)
}

export function reasonsFor(path: string, shadow: Shadow): readonly string[] {
  if (underIndex(path)) return []
  return ownerOf(path, shadow) === null ? [UNOWNED] : []
}

export function judgedIn(given: Body, shadow: Shadow): readonly string[] {
  return reasonsFor(given.path, shadow)
}
