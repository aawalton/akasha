import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const aine = {
  id: "019fa944-c37d-7631-be0b-d2ff83b74635",
  pageTypeSlug: "claude-account",
  slug: "aine",
  accountUuid: "d5dfe4b9-7b90-484a-b5ed-d338ef2333e0",
  email: "aine@alanwalton.com",
  aliasIndex: 8,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 28,
  scopes: [
    "user:file_upload",
    "user:inference",
    "user:mcp_servers",
    "user:profile",
    "user:sessions:claude_code",
  ],
} as const satisfies ClaudeAccount
