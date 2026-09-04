import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiShow = KiCollectionTemplate

export const kiShow = {
  id: "01a06825-d0ec-71a0-a7ee-80d30e5385ef",
  pageTypeSlug: "page-type",
  slug: "ki-show",
  definition: "a story Ki watches in episodes over seasons",
  pluralSlug: "ki-shows",
  extendsSlug: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A show of Ki's names the seasons it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A show of Ki's names the franchise it belongs to.",
    },
  ],
} as const satisfies PageType
