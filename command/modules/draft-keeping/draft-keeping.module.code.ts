import type { Reading as AsRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { type FileChange, pathsOf } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { appendEdits } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { unfresh } from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"

export type Drafting = {
  readonly page: string
}

export type Drafted = {
  readonly base: string
  readonly drafted: readonly string[]
}

const AGAIN_DRAFTED =
  "nothing was drafted — this edit was written against a body that is not the body there now," +
  " and reading it again does not move it. Each line above names a path that moved: read those" +
  " paths again and write this edit against what they now say. The edits already kept are not" +
  " at fault here, so a drop takes away work this refusal is no reason to lose."

const KEPT_AS_IT_WAS = "nothing was drafted — the edits are as the edits were"

export function draftedBy(
  root: string,
  page: string,
  changes: readonly FileChange[],
  named: string | null,
  asRead: readonly AsRead[]
): Drafted | Refused {
  const base = baseOf(root)
  const changing = [...new Set(changes.flatMap(pathsOf))]
  const stale = unfresh(root, named, base, changing, asRead, AGAIN_DRAFTED)
  if (stale !== null) return { refusals: stale, code: DATA }
  const kept = appendEdits(root, page, changes)
  if ("why" in kept) return { refusals: [kept.why, KEPT_AS_IT_WAS], code: OPERATIONAL }
  return { base, drafted: [...changing].sort() }
}
