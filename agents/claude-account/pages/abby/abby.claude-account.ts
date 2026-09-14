import type { ClaudeAccount } from "akasha/agents/claude-account/claude-account.page-type.types.ts"

export const abby = {
  id: "01a0a118-38ef-7000-aae5-4edbf750a2ab",
  type: "claude-account",
  slug: "abby",
  provider: "model-provider/anthropic",
  email: "abby@alanwalton.com",
  aliasIndex: 10,
} as const satisfies ClaudeAccount
