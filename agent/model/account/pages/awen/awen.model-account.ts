import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const awen = {
  id: "01a0a136-5f29-7000-9e85-2ec6c837c300",
  type: "page-type/model-account",
  slug: "awen",
  provider: "model-provider/anthropic",
  email: "awen@alanwalton.com",
  aliasIndex: 11,
  renewalDay: 14,
} as const satisfies ModelAccount
