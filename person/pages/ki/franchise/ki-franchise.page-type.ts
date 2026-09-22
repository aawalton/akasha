import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiFranchise = {
  id: "01a06825-d0ec-72c3-a6e7-40399fe1a4d4",
  type: "page-type/page-type",
  slug: "ki-franchise",
  definition: "the shows and movies Ki watches that share a world",
  extends: ["page-type/ki-collection-template"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A franchise of Ki's names the shows that franchise takes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A franchise of Ki's names the movies that franchise takes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show or movie named by a franchise of Ki's names that franchise back.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
