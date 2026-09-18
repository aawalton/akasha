import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const abby = {
  id: "01a0a118-38ef-7000-aae5-4edbf750a2ab",
  type: "page-type/model-account",
  slug: "abby",
  provider: "model-provider/anthropic",
  email: "abby@alanwalton.com",
  aliasIndex: 10,
  renewalDay: 14,
} as const satisfies ModelAccount
