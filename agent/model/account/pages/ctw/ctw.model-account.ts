import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const ctw = {
  id: "019f0da9-efcc-7dc6-a794-9d37f79c8f71",
  type: "page-type/model-account",
  slug: "ctw",
  provider: "model-provider/anthropic",
  accountUuid: "6153b85a-17f7-4325-98bc-77dd0761463b",
  email: "alan@clear-the-world.com",
  aliasIndex: 5,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 28,
  subscriptionCanceled: true,
  scopes: [
    "user:file_upload",
    "user:inference",
    "user:mcp_servers",
    "user:profile",
    "user:sessions:claude_code",
  ],
  createdAt: "2026-06-28T09:57:48.620Z",
  updatedAt: "2026-09-27T12:54:09.000Z",
} as const satisfies ModelAccount
