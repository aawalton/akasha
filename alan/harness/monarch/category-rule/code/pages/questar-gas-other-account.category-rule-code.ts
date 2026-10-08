import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const questarGasOtherAccount = {
  id: "01a0655b-fcd1-7005-a8e9-e7fe9ca0902d",
  type: "page-type/category-rule-code",
  slug: "questar-gas-other-account",
  title: "Questar gas other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["questar gas"] },
    { key: "account", comparison: "is-not", values: ["7151"] },
  ],
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
