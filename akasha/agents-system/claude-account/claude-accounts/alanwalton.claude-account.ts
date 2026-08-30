import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const alanwalton = {
  id: "019db533-f3b2-7818-830b-b9063ba57490",
  pageTypeSlug: "claude-account",
  slug: "alanwalton",
  accountUuid: "978ace2d-4458-4ade-ad9e-400764d37813",
  email: "alan@alanwalton.com",
  aliasIndex: 2,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 14,
  scopes: ["user:inference", "user:mcp_servers", "user:profile", "user:sessions:claude_code"],
} as const satisfies ClaudeAccount
