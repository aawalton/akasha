import type { PageType } from "@akasha/pages/page-type"

export const sessionActivity = {
  id: "01a06589-d117-759e-b934-fd346ffba4fd",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "session-activity",
  definition: "a kind of thing Alan spends his time on",
  pluralSlug: "session-activities",
  extends: ["page-type/page"],
  parts: ["number-property/default-difficulty"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/default-difficulty", required: true, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
    { pageProperty: "number-property/seq", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session naming no activity states its own difficulty instead.",
    },
    {
      invariantKind: "departure",
      statement: "An activity is matched to a session by the session's title.",
    },
  ],
  types: "ts",
} as const satisfies PageType
