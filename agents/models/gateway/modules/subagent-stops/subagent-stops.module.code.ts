import { join } from "node:path"
import type { HeldSubagents } from "akasha/agents/models/gateway/modules/subagent-stop-refusal/subagent-stop-refusal.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agents/modules/read-record/read-record.module.code.ts"
import { subagentStopped } from "akasha/agents/subagents/properties/subagent-stopped.boolean-property.ts"
import {
  dirsOf,
  type Following,
  followFolders,
} from "akasha/infrastructure/services/workstations/modules/file-following/file-following.module.code.ts"
import {
  everyOfType,
  indexNamed,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import { uncommittedIn } from "akasha/pages/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/utils/narrow/modules/text-at/text-at.module.code.ts"

const SUBAGENT = "subagent"

const AGENT_ID = "agentId"

const STOPPED = subagentStopped.propertySlug

const SETTLE_MS = 100

export type StoppedSubagents = HeldSubagents & { readonly stop: () => undefined }

export type PagesOf = (root: string) => readonly string[]

export function subagentPagesIn(root: string): readonly string[] {
  return everyOfType(root, SUBAGENT).map((one) => one.path)
}

export function ownOf(agentId: string, seatId: string): string | null {
  if (seatId === "") return null
  const opens = `${seatId}${SUBAGENT_MARK}`
  if (!agentId.startsWith(opens)) return null
  const own = agentId.slice(opens.length)
  return own === "" ? null : own
}

export function stoppedOwnIdsIn(
  root: string,
  seatId: string,
  pages: readonly string[] = subagentPagesIn(root)
): ReadonlySet<string> {
  const held = new Set<string>()
  for (const page of pages) {
    const value = valueAt(page, root)
    const agentId = value === null ? null : textAt(value, AGENT_ID)
    const own = agentId === null ? null : ownOf(agentId, seatId)
    if (own === null) continue
    if (uncommittedIn(root, page)?.[STOPPED] === true) held.add(own)
  }
  return held
}

export function foldersOf(root: string, pages: readonly string[]): ReadonlySet<string> {
  const folders = new Set<string>([join(root, indexNamed(), indexValue.name)])
  for (const one of dirsOf(pages.map((page) => join(root, page)))) folders.add(one)
  return folders
}

export function followingStops(
  root: string,
  seatId: string,
  pagesOf: PagesOf = subagentPagesIn,
  settleMs: number = SETTLE_MS
): StoppedSubagents {
  let held: ReadonlySet<string> = new Set()
  let following: Following | null = null
  let watched = ""
  const reread = (): undefined => {
    held = stoppedOwnIdsIn(root, seatId, pagesOf(root))
  }
  const refollow = (): undefined => {
    const folders = foldersOf(root, pagesOf(root))
    const key = [...folders].sort().join("\n")
    if (key === watched) return
    following?.stop()
    watched = key
    following = followFolders(
      folders,
      () => {
        reread()
        refollow()
      },
      settleMs
    )
  }
  reread()
  refollow()
  return {
    has: (own) => held.has(own),
    stop: () => {
      following?.stop()
      following = null
    },
  }
}
