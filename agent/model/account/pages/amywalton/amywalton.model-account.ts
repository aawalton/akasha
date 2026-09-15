import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const amywalton = {
  id: "019f3233-61c9-7f41-bf10-a014be4731d1",
  type: "page-type/model-account",
  slug: "amywalton",
  provider: "model-provider/anthropic",
  accountUuid: "f4965500-e968-4940-8da7-c9a7eaf106dc",
  email: "amy@alanwalton.com",
  aliasIndex: 7,
  subscriptionType: "max",
  rateLimitTier: "default_claude_max_20x",
  renewalDay: 5,
  scopes: [
    "user:file_upload",
    "user:inference",
    "user:mcp_servers",
    "user:profile",
    "user:sessions:claude_code",
  ],
} as const satisfies ModelAccount
