import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const decisionGroup = {
  id: "01a04e11-9f97-7f42-bb41-d519ae123a65",
  type: "page-type/page-type",
  slug: "decision-group",
  definition: "the standing a decision has",
  parts: ["decision-group/condition", "decision-group/design", "decision-group/intent"],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A group is read off the kinds that name the group rather than stored as a list of the kinds.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
