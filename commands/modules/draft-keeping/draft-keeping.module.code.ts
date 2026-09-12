import type { Reading as AsRead } from "akasha/agents/read-record/read-record.module.code.ts"
import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { appendEdits } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { unfresh } from "akasha/commands/modules/change-freshness/change-freshness.module.code.ts"
import type { Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { baseOf } from "akasha/commands/modules/landing-change-composing/landing-change-composing.module.code.ts"

export type Drafting = {
  readonly page: string
}

export type Drafted = {
  readonly base: string
  readonly drafted: readonly string[]
}

const AGAIN_DRAFTED =
  "nothing was drafted — reading those bodies again leaves the edits kept as they were," +
  " so `akasha change drop` with `all: true` takes them away and the change is drafted again" +
  " against what is there now"

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
