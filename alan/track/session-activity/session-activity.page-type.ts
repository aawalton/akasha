import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const sessionActivity = {
  id: "01a06589-d117-759e-b934-fd346ffba4fd",
  type: "page-type/page-type",
  slug: "session-activity",
  definition: "a kind of thing Alan spends his time on",
  extends: ["page-type/page"],
  parts: ["number-property/default-difficulty"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/default-difficulty", required: true, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
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
} as const satisfies PageType
