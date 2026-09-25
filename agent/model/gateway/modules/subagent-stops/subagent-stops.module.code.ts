import { join } from "node:path"
import type { HeldSubagents } from "akasha/agent/model/gateway/modules/subagent-stop-refusal/subagent-stop-refusal.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { seatNamedIn } from "akasha/agent/subagent/modules/page-asking/subagent-page-asking.module.code.ts"
import { takingDown } from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import { subagentStopped } from "akasha/agent/subagent/properties/subagent-stopped.boolean-property.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import {
  dirsOf,
  type Following,
  followFolders,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

const SUBAGENT = "subagent"

const SUBAGENTS_AT = "agent/subagent/pages"

const AGENT_ID = "agentId"

const STOPPED = subagentStopped.propertySlug

const SETTLE_MS = 100

export type StoppedSubagents = HeldSubagents & { readonly stop: () => undefined }

export type PagesOf = (root: string) => readonly string[]

export type Taking = (root: string, seatName: string, seatId: string, own: string) => undefined

function subagentPagesIn(root: string): readonly string[] {
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

function seatNameOr(root: string, seatId: string): string | null {
  try {
    return seatNamedIn(root, seatId)
  } catch {
    return null
  }
}

export function foldersOf(root: string, pages: readonly string[]): ReadonlySet<string> {
  const folders = new Set<string>([join(root, SUBAGENTS_AT)])
  for (const one of dirsOf(pages.map((page) => join(root, page)))) folders.add(one)
  return folders
}

export function followingStops(
  root: string,
  seatId: string,
  pagesOf: PagesOf = subagentPagesIn,
  settleMs: number = SETTLE_MS,
  taking: Taking = takingDown
): StoppedSubagents {
  let held: ReadonlySet<string> = new Set()
  let following: Following | null = null
  let watched = ""
  const ever = new Set<string>()
  const asked = new Set<string>()
  const reread = (): undefined => {
    held = stoppedOwnIdsIn(root, seatId, pagesOf(root))
    for (const own of held) ever.add(own)
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
    has: (own) => held.has(own) || ever.has(own),
    taken: (own) => {
      if (asked.has(own)) return undefined
      const seatName = seatNameOr(root, seatId)
      if (seatName === null) return undefined
      asked.add(own)
      taking(root, seatName, seatId, own)
      return undefined
    },
    stop: () => {
      following?.stop()
      following = null
    },
  }
}
