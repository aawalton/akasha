import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const masteryLevel = {
  id: "01a0784a-cdb9-75af-be55-75cc37d93123",
  type: "page-type/page-type",
  slug: "mastery-level",
  definition: "a rung on the scale a topic's mastery is scored against",
  extends: ["page-type/domain"],
  parts: [
    "mastery-level/doctor",
    "mastery-level/expert",
    "mastery-level/master",
    "mastery-level/novice",
    "mastery-level/reader",
    "mastery-level/sage",
    "mastery-level/scholar",
    "mastery-level/student",
    "number-property/mastery-rank",
    "text-property/mastery-behaviour",
  ],
  properties: [
    { pageProperty: "number-property/mastery-rank", required: true, many: false },
    { pageProperty: "text-property/mastery-behaviour", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rung is an observable interview behaviour rather than facts recalled or time spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer Alan produced unaided is evidence of a rung.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An answer Alan agreed with or picked from a list is no evidence of a rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A topic Alan derives from the core Alan has scores whether or not Alan studied that topic.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
