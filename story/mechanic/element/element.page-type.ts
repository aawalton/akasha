import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const element = {
  id: "01a0ca6d-c8e0-7304-b515-37e66f045ec1",
  type: "page-type/page-type",
  slug: "element",
  definition: "a kind of essence a world is made of",
  pluralSlug: "elements",
  extends: ["page-type/mechanic"],
  parts: ["page-type/tower-element"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An element is in a world whether or not a character senses it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
