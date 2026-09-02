import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { CatalogTags } from "../properties/catalog-tags.text-property.ts"
import type { ExternalId } from "../properties/external-id.text-property.ts"
import type { ExternalLink } from "../properties/external-link.text-property.ts"
import type { LastSyncedAt } from "../properties/last-synced-at.text-property.ts"
import type { Rating } from "../properties/rating.text-property.ts"
import type { Source } from "../properties/source.text-property.ts"
import type { Genre } from "./properties/genre.text-property.ts"
import type { Reaction } from "./properties/reaction.file-property.ts"

export type Artist = Page & {
  title: Title
  externalId: ExternalId
  externalLink: ExternalLink
  source: Source
  lastSyncedAt: LastSyncedAt
  genre?: readonly Genre[]
  rating?: Rating
  tags?: readonly CatalogTags[]
  reaction?: Reaction
}

export const artist = {
  id: "01a06243-144b-7013-99b2-e1b52805e43b",
  pageTypeSlug: "page-type",
  slug: "artist",
  definition: "a musician whose work Alan keeps",
  pluralSlug: "artists",
  extendsSlug: "page-type/page",
  partSlugs: ["file-property/reaction", "text-property/genre"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "external-id", required: true, many: false },
    { pagePropertySlug: "external-link", required: true, many: false },
    { pagePropertySlug: "source", required: true, many: false },
    { pagePropertySlug: "last-synced-at", required: true, many: false },
    { pagePropertySlug: "genre", required: false, many: true, max: null },
    { pagePropertySlug: "rating", required: false, many: false },
    { pagePropertySlug: "catalog-tags", required: false, many: true, max: null },
    { pagePropertySlug: "reaction", required: false, many: false },
  ],
} as const satisfies PageType
