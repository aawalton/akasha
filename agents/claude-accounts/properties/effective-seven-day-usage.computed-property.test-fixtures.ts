import type { ClaudeAccount } from "akasha/agents/claude-accounts/claude-account.page-type.types.ts"
import type { Reach } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const REACH: Reach = { target: () => null, naming: () => [] }

const BASE: ClaudeAccount = {
  id: "one",
  slug: "aine",
  email: "aine@alanwalton.com",
  aliasIndex: 0,
}

export function account(held: Record<string, unknown>): ClaudeAccount {
  return Object.assign({ ...BASE }, held)
}
