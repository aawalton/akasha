import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"

export const deepseek = {
  id: "01a0a532-2f90-7ddc-8fc4-581cd55bcc16",
  type: "page-type/model-account",
  slug: "deepseek",
  provider: "model-provider/deepseek",
  email: "aawalton@gmail.com",
  aliasIndex: 12,
} as const satisfies ModelAccount
