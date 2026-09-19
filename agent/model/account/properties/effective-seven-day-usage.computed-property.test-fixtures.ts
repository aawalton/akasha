import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"
import { ANTHROPIC } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

export const REACH: Reach = { target: () => null, naming: () => [] }

const BASE: ModelAccount = {
  id: "one",
  slug: "aine",
  email: "aine@alanwalton.com",
  aliasIndex: 0,
  provider: ANTHROPIC,
}

export function account(held: Record<string, unknown>): ModelAccount {
  return Object.assign({ ...BASE }, held)
}
