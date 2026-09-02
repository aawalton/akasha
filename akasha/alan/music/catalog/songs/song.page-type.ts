import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { CatalogTags } from "../properties/catalog-tags.text-property.ts"
import type { ExternalId } from "../properties/external-id.text-property.ts"
import type { ExternalLink } from "../properties/external-link.text-property.ts"
import type { LastSyncedAt } from "../properties/last-synced-at.text-property.ts"
import type { Rating } from "../properties/rating.text-property.ts"
import type { Source } from "../properties/source.text-property.ts"
import type { ArtistSlug } from "./properties/artist-slug.relation-property.ts"
import type { Insights } from "./properties/insights.file-property.ts"
import type { Lyrics } from "./properties/lyrics.file-property.ts"
import type { LyricsSource } from "./properties/lyrics-source.text-property.ts"
import type { Performed } from "./properties/performed.boolean-property.ts"
import type { PersonalConnections } from "./properties/personal-connections.file-property.ts"
import type { Singability } from "./properties/singability.text-property.ts"
import type { SongType } from "./properties/song-type.text-property.ts"
import type { SyncedLyrics } from "./properties/synced-lyrics.file-property.ts"
import type { Written } from "./properties/written.text-property.ts"

export type Song = Page & {
  title: Title
  artistSlug: ArtistSlug
  externalId: ExternalId
  externalLink: ExternalLink
  source: Source
  lastSyncedAt: LastSyncedAt
  songType: SongType
  performed: Performed
  lyricsSource?: LyricsSource
  written?: Written
  rating?: Rating
  singability?: Singability
  tags?: readonly CatalogTags[]
  lyrics?: Lyrics
  syncedLyrics?: SyncedLyrics
  insights?: Insights
  personalConnections?: PersonalConnections
}

export const song = {
  id: "01a06243-144b-7012-9da5-a570a8174672",
  pageTypeSlug: "page-type",
  slug: "song",
  definition: "a piece of music Alan keeps",
  pluralSlug: "songs",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/performed",
    "file-property/insights",
    "file-property/lyrics",
    "file-property/personal-connections",
    "file-property/synced-lyrics",
    "relation-property/artist-slug",
    "text-property/lyrics-source",
    "text-property/singability",
    "text-property/song-type",
    "text-property/written",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "artist-slug", required: true, many: false },
    { pagePropertySlug: "external-id", required: true, many: false },
    { pagePropertySlug: "external-link", required: true, many: false },
    { pagePropertySlug: "source", required: true, many: false },
    { pagePropertySlug: "last-synced-at", required: true, many: false },
    { pagePropertySlug: "song-type", required: true, many: false },
    { pagePropertySlug: "performed", required: true, many: false },
    { pagePropertySlug: "lyrics-source", required: false, many: false },
    { pagePropertySlug: "written", required: false, many: false },
    { pagePropertySlug: "rating", required: false, many: false },
    { pagePropertySlug: "singability", required: false, many: false },
    { pagePropertySlug: "catalog-tags", required: false, many: true, max: null },
    { pagePropertySlug: "lyrics", required: false, many: false },
    { pagePropertySlug: "synced-lyrics", required: false, many: false },
    { pagePropertySlug: "insights", required: false, many: false },
    { pagePropertySlug: "personal-connections", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A song names one artist.",
    },
  ],
} as const satisfies PageType
