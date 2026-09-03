import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiEpisode = KiCollectionTemplate

export const kiEpisode = {
  id: "01a06825-d0ec-79a7-aa75-2b13b1b20f22",
  pageTypeSlug: "page-type",
  slug: "ki-episode",
  definition: "one instalment of a season Ki watches",
  pluralSlug: "ki-episodes",
  extendsSlug: "page-type/ki-collection-template",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An episode of Ki's names the season it is part of.",
    },
    {
      invariantKind: "departure",
      statement: "An episode of Ki's states its season's number beside the season it names.",
    },
  ],
} as const satisfies PageType
