import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const masteryLevel = {
  id: "01a0784a-cdb9-75af-be55-75cc37d93123",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "mastery-level",
  definition: "one rung on the scale a topic's mastery is scored against",
  pluralSlug: "mastery-levels",
  extends: ["page-type/domain"],
  parts: [
    "mastery-level/novice",
    "mastery-level/reader",
    "mastery-level/student",
    "mastery-level/scholar",
    "mastery-level/expert",
    "mastery-level/master",
    "mastery-level/doctor",
    "mastery-level/sage",
    "number-property/mastery-rank",
    "text-property/mastery-behaviour",
  ],
  properties: [
    { pageProperty: "number-property/mastery-rank", required: true, many: false },
    { pageProperty: "text-property/mastery-behaviour", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rung is an observable interview behaviour rather than facts recalled or time spent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer Alan produced unaided is evidence of a rung.",
    },
    {
      invariantKind: "absence",
      statement: "An answer Alan agreed with or picked from a list is no evidence of a rung.",
    },
    {
      invariantKind: "departure",
      statement:
        "A topic Alan derives from the core Alan has scores whether or not Alan studied that topic.",
    },
  ],
  types: "ts",
} as const satisfies PageType
