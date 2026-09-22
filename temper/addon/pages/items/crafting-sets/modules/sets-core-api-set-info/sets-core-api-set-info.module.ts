import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiSetInfo = {
  id: "01a06231-8f1d-7816-b46e-caba9de72027",
  type: "page-type/module",
  slug: "sets-core-api-set-info",
  definition: "everything known about a set put into a single table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Set data asked for in one language and without item ids is cached for later asks.",
    },
  ],
} as const satisfies Module
