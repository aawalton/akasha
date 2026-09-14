import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"
import type { Reach } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const REACH: Reach = { target: () => null, naming: () => [] }

const BASE: ModelAccount = {
  id: "one",
  slug: "aine",
  email: "aine@alanwalton.com",
  aliasIndex: 0,
  provider: "model-provider/anthropic",
}

export function account(held: Record<string, unknown>): ModelAccount {
  return Object.assign({ ...BASE }, held)
}
