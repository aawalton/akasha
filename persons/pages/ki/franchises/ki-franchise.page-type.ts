import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const kiFranchise = {
  id: "01a06825-d0ec-72c3-a6e7-40399fe1a4d4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-franchise",
  definition: "the shows and movies Ki watches that share one world",
  pluralSlug: "ki-franchises",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A franchise of Ki's names the shows that franchise takes in.",
    },
    {
      invariantKind: "departure",
      statement: "A franchise of Ki's names the movies that franchise takes in.",
    },
    {
      invariantKind: "departure",
      statement: "A show or movie named by a franchise of Ki's names that franchise back.",
    },
  ],
  types: "ts",
} as const satisfies PageType
