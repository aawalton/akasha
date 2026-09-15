import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const alanwalton = {
  id: "019db533-f3b2-7818-830b-b9063ba57490",
  type: "page-type/model-account",
  slug: "alanwalton",
  provider: "model-provider/anthropic",
  accountUuid: "978ace2d-4458-4ade-ad9e-400764d37813",
  email: "alan@alanwalton.com",
  aliasIndex: 2,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 18,
  scopes: ["user:inference", "user:mcp_servers", "user:profile", "user:sessions:claude_code"],
} as const satisfies ModelAccount
