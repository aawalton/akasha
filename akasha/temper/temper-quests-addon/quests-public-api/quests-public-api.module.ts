import type { Module } from "@akasha/code-system/module"

export const questsPublicApi = {
  id: "01a0635f-391c-7877-ac21-ad273512b197",
  pageTypeSlug: "module",
  slug: "quests-public-api",
  definition: "the global another addon turns answering dialogue on and off through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global is named for the addon.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the two toggles and nothing more.",
    },
  ],
} as const satisfies Module
