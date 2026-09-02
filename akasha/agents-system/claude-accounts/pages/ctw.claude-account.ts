import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const ctw = {
  id: "019f0da9-efcc-7dc6-a794-9d37f79c8f71",
  pageTypeSlug: "claude-account",
  slug: "ctw",
  accountUuid: "6153b85a-17f7-4325-98bc-77dd0761463b",
  email: "alan@clear-the-world.com",
  aliasIndex: 5,
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
