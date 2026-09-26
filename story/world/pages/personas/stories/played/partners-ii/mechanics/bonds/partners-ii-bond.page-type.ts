import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiBond = {
  id: "01a0de4f-393c-75ca-baf7-40e71623d7c3",
  type: "page-type/page-type",
  slug: "partners-ii-bond",
  definition: "the bond Alan and a companion in Partners II have built",
  pluralSlug: "bonds",
  extends: ["page-type/world-relationship"],
  parts: ["relation-property/stage-of-partners-ii-bond", "page-type/partners-ii-bond-stage"],
  properties: [
    { pageProperty: "relation-property/stage-of-partners-ii-bond", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bond's points are earned by play, never by declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Points come from attention, costly honesty, shared risk, time given, and staying.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The awards per scene and the stage thresholds are hidden.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
