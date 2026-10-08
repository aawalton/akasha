import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const abby = {
  id: "01a0a118-38ef-7000-aae5-4edbf750a2ab",
  type: "page-type/model-account",
  slug: "abby",
  provider: "model-provider/anthropic",
  email: "abby@alanwalton.com",
  aliasIndex: 10,
  renewalDay: 14,
  createdAt: "2026-09-14T18:05:14.351Z",
  updatedAt: "2026-09-18T22:57:45.000Z",
} as const satisfies ModelAccount
