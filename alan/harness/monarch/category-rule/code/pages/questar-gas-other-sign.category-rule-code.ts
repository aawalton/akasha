import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const questarGasOtherSign = {
  id: "01a0655b-fcd1-7006-98b4-442723a0cd01",
  type: "page-type/category-rule-code",
  slug: "questar-gas-other-sign",
  title: "Questar gas other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["questar gas"] },
    { key: "account", comparison: "is", values: ["7151"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
