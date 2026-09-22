import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const displayCategoryConstants = {
  id: "01a06127-6628-72fa-ab27-53d7049284ec",
  type: "page-type/module",
  slug: "display-category-constants",
  definition: "the display category numbers the game client has, each under the client's spelling",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a number into display text.",
    },
  ],
} as const satisfies Module
