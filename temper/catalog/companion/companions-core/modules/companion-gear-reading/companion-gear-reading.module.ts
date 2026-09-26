import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearReading = {
  id: "01a0deec-faa1-71cf-af81-f7d765e0c2a3",
  type: "page-type/module",
  slug: "companion-gear-reading",
  definition: "the companion gear the catalogue holds, built from the rows of the pages it reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a page, so the caller hands in the rows of each page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each list of keys names only keys its page type declares.",
    },
  ],
} as const satisfies Module
