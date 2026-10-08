import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const aura = {
  id: "01a0a110-7371-7000-9011-ef85f7127097",
  type: "page-type/model-account",
  slug: "aura",
  provider: "model-provider/anthropic",
  email: "aura@alanwalton.com",
  aliasIndex: 9,
  renewalDay: 14,
  subscriptionCanceled: true,
  createdAt: "2026-09-14T17:56:45.041Z",
  updatedAt: "2026-10-08T16:02:01.874Z",
} as const satisfies ModelAccount
