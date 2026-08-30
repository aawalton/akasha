import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const tempereso = {
  id: "019db533-f3b2-780f-ad94-08ee3332e5be",
  pageTypeSlug: "claude-account",
  slug: "tempereso",
  accountUuid: "80a42386-26f2-4457-9581-639fc99fac18",
  email: "alan@tempereso.com",
  aliasIndex: 4,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 9,
  scopes: ["user:inference", "user:mcp_servers", "user:profile", "user:sessions:claude_code"],
} as const satisfies ClaudeAccount
