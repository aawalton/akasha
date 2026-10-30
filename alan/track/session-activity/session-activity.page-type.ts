import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const sessionActivity = {
  id: "01a06589-d117-759e-b934-fd346ffba4fd",
  type: "page-type/page-type",
  slug: "session-activity",
  definition: "a kind of thing Alan does in a tracked session",
  extends: ["page-type/page"],
  parts: ["number-property/default-difficulty"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/default-difficulty", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session naming no activity states its own difficulty instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity is matched to a session by the session's title.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:32:05.911Z",
  updatedAt: "2026-10-30T16:40:56.901Z",
} as const satisfies PageType
