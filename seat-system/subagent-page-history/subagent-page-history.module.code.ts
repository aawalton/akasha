import { loadedFrom } from "@akasha/pages/page-value"
import { told } from "../../git/git-running/git-running.module.code.ts"

const AGENT_ID = "agentId"

export interface PageInHistory {
  readonly commit: string
  readonly path: string
  readonly values: Record<string, unknown>
}

export function pageInHistory(root: string, at: string): PageInHistory | null {
  if (at === "") return null
  const said = told(root, ["log", "--diff-filter=AM", "-n", "1", "--format=%H", "--", at])
  const commit = said === null ? "" : said.trim()
  if (commit === "") return null
  const text = told(root, ["show", `${commit}:${at}`])
  if (text === null || text === "") return null
  const held = loadedFrom(text)
  if (held.failed !== null || held.value === null) return null
  return { commit, path: at, values: held.value as Record<string, unknown> }
}

export function subagentPageInHistory(
  root: string,
  at: string,
  agentId: string
): PageInHistory | null {
  if (agentId === "") return null
  const held = pageInHistory(root, at)
  if (held === null) return null
  return held.values[AGENT_ID] === agentId ? held : null
}
