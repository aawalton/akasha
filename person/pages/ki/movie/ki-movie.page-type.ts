import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiMovie = {
  id: "01a06825-d0ec-7654-8084-1e099d039f38",
  type: "page-type/page-type",
  slug: "ki-movie",
  definition: "a story Ki watches in a sitting",
  extends: ["page-type/ki-collection-template"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A movie of Ki's names the franchise that movie belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movie of Ki's belongs to one franchise at most.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
