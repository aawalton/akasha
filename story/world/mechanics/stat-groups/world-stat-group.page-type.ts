import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldStatGroup = {
  id: "01a182fd-fbd4-7d73-b2a2-4014307a5473",
  type: "page-type/page-type",
  slug: "world-stat-group",
  definition: "a group a world shows some of its stats under by name",
  pluralSlug: "stat-groups",
  extends: ["page-type/world-mechanic"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/display-order", required: false, many: false },
  ],
  runsTabooCheck: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat group's title is what its world calls the stats shown under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat group stating a display order is shown in that order among its siblings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat stating no group is shown under Attributes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T14:50:45.588Z",
  updatedAt: "2026-10-28T14:50:45.588Z",
} as const satisfies PageType
