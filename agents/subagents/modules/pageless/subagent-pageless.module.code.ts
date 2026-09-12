import type { SubagentPage } from "akasha/agents/subagents/modules/census/subagent-census.module.code.ts"

export const NONE_PAGELESS = "every subagent a transcript names as at work has a page of its own"

export function pagelessAmong(
  pages: readonly SubagentPage[],
  running: ReadonlySet<string>
): readonly string[] {
  const held = new Set(pages.map((one) => one.own))
  return [...running].filter((one) => one !== "" && !held.has(one)).sort()
}

export function pagelessSaid(own: readonly string[]): readonly string[] {
  if (own.length === 0) return ["", NONE_PAGELESS]
  return [
    "",
    `${String(own.length)} subagent(s) a transcript names as at work have no page, and every`,
    "`akasha change` call each of them makes is refused until a page is written for it:",
    ...own,
  ]
}
