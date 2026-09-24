import { pageFlagOf } from "akasha/agent/seat/modules/page-values/seat-page-values.module.code.ts"

const ON_CALL_PAGE_KEY = "on-call"

export function onCallOf(agent: string): boolean {
  return pageFlagOf(agent, ON_CALL_PAGE_KEY)
}
