import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiFranchise = KiCollectionTemplate

export const kiFranchise = {
  id: "01a06825-d0ec-72c3-a6e7-40399fe1a4d4",
  pageTypeSlug: "page-type",
  slug: "ki-franchise",
  definition: "the shows and movies Ki watches that share one world",
  pluralSlug: "ki-franchises",
  extendsSlug: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A franchise of Ki's names the shows it takes in.",
    },
    {
      invariantKind: "departure",
      statement: "A franchise of Ki's names the movies it takes in.",
    },
    {
      invariantKind: "departure",
      statement: "A show or movie a franchise of Ki's names, names that franchise back.",
    },
  ],
} as const satisfies PageType
