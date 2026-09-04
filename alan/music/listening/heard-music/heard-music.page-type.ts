import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { PersonSlug } from "../../../../seat-system/seats/properties/person-slug.relation-property.ts"
import type { Tracks } from "./tracks/tracks.page-property-entry.ts"

export type HeardMusic = Page & {
  personSlug: PersonSlug
  tracks: Tracks
}

export const heardMusic = {
  id: "01a06240-340f-700a-be22-823bb6c905f7",
  pageTypeSlug: "page-type",
  slug: "heard-music",
  definition: "every track one person has heard",
  pluralSlug: "heard-music",
  extendsSlug: ["page-type/page"],
  partSlugs: ["page-property-entry/tracks"],
  properties: [
    { pagePropertySlug: "person-slug", required: true, many: false },
    { pagePropertySlug: "tracks", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One person has one heard music page.",
    },
    {
      invariantKind: "departure",
      statement: "A track entered into a heard music page is never taken out.",
    },
  ],
} as const satisfies PageType
