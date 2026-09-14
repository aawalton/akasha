import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const aow = {
  id: "019f1961-6768-77e4-934a-0e27173ee5bc",
  type: "model-account",
  slug: "aow",
  provider: "model-provider/anthropic",
  accountUuid: "849f42fd-b12a-4cb1-ad94-4d53103160a1",
  email: "alan@archiveofworlds.app",
  aliasIndex: 6,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 30,
  scopes: [
    "user:file_upload",
    "user:inference",
    "user:mcp_servers",
    "user:profile",
    "user:sessions:claude_code",
  ],
} as const satisfies ModelAccount
