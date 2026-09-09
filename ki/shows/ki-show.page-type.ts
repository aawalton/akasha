import type { PageType } from "@akasha/pages/page-type"
import type { KiCollectionTemplate } from "../collection-templates/ki-collection-template.page-type.types.ts"

export type KiShow = KiCollectionTemplate

export const kiShow = {
  id: "01a06825-d0ec-71a0-a7ee-80d30e5385ef",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-show",
  definition: "a story Ki watches in episodes over seasons",
  pluralSlug: "ki-shows",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A show of Ki's names the seasons that show has.",
    },
    {
      invariantKind: "departure",
      statement: "A show of Ki's names the franchise that show belongs to.",
    },
  ],
} as const satisfies PageType
