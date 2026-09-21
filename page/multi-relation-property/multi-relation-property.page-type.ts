import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const multiRelationProperty = {
  id: "01a0c4f3-6a9a-7368-b588-9ec85cc4ade3",
  type: "page-type/page-type",
  slug: "multi-relation-property",
  definition: "a page property holding many relations to pages of one page type",
  extends: ["page-type/relation-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of this kind is a list of relations rather than one relation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each relation the list holds is drawn as a chip of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
