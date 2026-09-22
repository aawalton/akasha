import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangStrings = {
  id: "01a06269-28c2-7ccc-8403-4fb2afb9e34f",
  type: "page-type/module",
  slug: "destinations-lang-strings",
  definition: "the client language chosen and the settings and collectible strings answered for it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name registered as a string id is a key of the settings strings, and no other name is.",
    },
  ],
} as const satisfies Module
