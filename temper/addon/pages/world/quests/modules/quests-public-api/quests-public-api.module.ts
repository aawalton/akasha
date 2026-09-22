import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsPublicApi = {
  id: "01a0635f-391c-7877-ac21-ad273512b197",
  type: "page-type/module",
  slug: "quests-public-api",
  definition: "the global another addon turns answering dialogue on and off through",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is named for the addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global has the two toggles and nothing more.",
    },
  ],
} as const satisfies Module
