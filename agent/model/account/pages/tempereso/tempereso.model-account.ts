import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const tempereso = {
  id: "019db533-f3b2-780f-ad94-08ee3332e5be",
  type: "page-type/model-account",
  slug: "tempereso",
  provider: "model-provider/anthropic",
  accountUuid: "80a42386-26f2-4457-9581-639fc99fac18",
  email: "alan@tempereso.com",
  aliasIndex: 4,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  scopes: ["user:inference", "user:mcp_servers", "user:profile", "user:sessions:claude_code"],
} as const satisfies ModelAccount
