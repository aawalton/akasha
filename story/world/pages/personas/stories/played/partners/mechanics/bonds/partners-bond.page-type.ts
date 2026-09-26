import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersBond = {
  id: "01a0de4b-e1c5-713a-9643-d0a765c97932",
  type: "page-type/page-type",
  slug: "partners-bond",
  definition: "the bond Alan and a companion in Partners have built",
  pluralSlug: "bonds",
  extends: ["page-type/world-relationship"],
  parts: ["relation-property/stage-of-partners-bond", "page-type/partners-bond-stage"],
  properties: [
    { pageProperty: "relation-property/stage-of-partners-bond", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bond's points are earned by play, never by declaration.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
