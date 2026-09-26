import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEsoTraitMap = {
  id: "01a06108-0767-7cc4-aa89-8fc44f01c10b",
  type: "page-type/module",
  slug: "companion-eso-trait-map",
  definition:
    "which numbered Elder Scrolls Online trait a companion trait answers to, by gear family",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each family of gear numbers the same nine traits differently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers are read off the imported trait pages, so an add-on builds them in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code only a browser or server runs reads the numbers from the catalogue instead.",
    },
  ],
} as const satisfies Module
