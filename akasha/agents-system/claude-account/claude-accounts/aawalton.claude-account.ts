import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const aawalton = {
  id: "019db533-f3b2-781d-8df5-fa78ae4131c5",
  pageTypeSlug: "claude-account",
  slug: "aawalton",
  accountUuid: "f866185e-c98d-4998-b4c6-626ffbee8799",
  email: "aawalton@gmail.com",
  aliasIndex: 1,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 27,
  scopes: ["user:inference", "user:mcp_servers", "user:profile", "user:sessions:claude_code"],
} as const satisfies ClaudeAccount
