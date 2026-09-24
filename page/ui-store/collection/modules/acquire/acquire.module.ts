import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const acquire = {
  id: "01a05b69-453d-7baf-9785-452b40c60767",
  type: "page-type/module",
  slug: "acquire",
  definition: "the record of which shapes and slugs are asked for and which are ready",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape naming pages is ready only once its own answer arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows kept from an earlier visit make every other shape ready at once.",
    },
  ],
} as const satisfies Module
