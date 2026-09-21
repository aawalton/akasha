import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const personaAnchorImage = {
  id: "01a0655b-4a9b-700a-b7af-04be2a9c0df4",
  type: "page-type/page-type",
  slug: "persona-anchor-image",
  definition: "the picture every other picture of a persona is drawn to match",
  extends: ["page-type/persona-image"],
  parts: [],
  properties: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor is matched by the persona alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona has one anchor.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
