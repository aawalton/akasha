import { exclusively } from "@akasha/file-system/exclusive"
import { whereFor } from "@akasha/markdown-pages/page-write-where"
import {
  readUncommitted,
  uncommittedPathFor,
  writeUncommitted,
} from "@akasha/markdown-pages/uncommitted"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

const STEP = "step"

const PENDING = "pending"

export function takeStepIfStatus(
  roots: Roots,
  stepSeq: string,
  was: string,
  values: Readonly<Record<string, unknown>>
): boolean {
  const at = whereFor(roots, STEP, stepSeq)
  if (at === null) return false
  return exclusively(uncommittedPathFor(at.path), () => {
    const held = readUncommitted(at.path) ?? {}
    const status = typeof held.status === "string" ? held.status : PENDING
    if (status !== was) return false
    writeUncommitted(at.path, { ...held, ...values })
    return true
  })
}
