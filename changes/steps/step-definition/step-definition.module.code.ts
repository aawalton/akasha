import { whereFor } from "@akasha/markdown-pages/page-write-where"
import { readUncommitted } from "@akasha/markdown-pages/uncommitted"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

const STEP = "step"

function isMapping(one: unknown): one is Record<string, unknown> {
  return one !== null && typeof one === "object" && !Array.isArray(one)
}

export function stepDefinition(roots: Roots, stepSeq: string): Readonly<Record<string, unknown>> {
  const at = whereFor(roots, STEP, stepSeq)
  if (at === null) return {}
  const stated = readUncommitted(at.path)?.definition
  return isMapping(stated) ? stated : {}
}
