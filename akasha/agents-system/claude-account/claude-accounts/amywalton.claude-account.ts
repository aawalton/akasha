import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const amywalton = {
  id: "019f3233-61c9-7f41-bf10-a014be4731d1",
  pageTypeSlug: "claude-account",
  slug: "amywalton",
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
} as const satisfies ClaudeAccount
