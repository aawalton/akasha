import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const audhdalan = {
  id: "019db533-f3b2-7814-a3f7-99f52601a37c",
  type: "page-type/model-account",
  slug: "audhdalan",
  provider: "model-provider/anthropic",
  accountUuid: "d37503c0-b37e-4b0c-9632-7ca1d7917d79",
  email: "alan@audhdalan.com",
  aliasIndex: 3,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 18,
  subscriptionCanceled: true,
  scopes: ["user:inference", "user:mcp_servers", "user:profile", "user:sessions:claude_code"],
  createdAt: "2026-04-22T12:39:34.066Z",
  updatedAt: "2026-10-08T16:04:38.502Z",
} as const satisfies ModelAccount
