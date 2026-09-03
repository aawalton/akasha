import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const musicCatalog = {
  id: "01a06238-8d2c-7f24-81f1-c8b7232268d3",
  pageTypeSlug: "domain",
  slug: "music-catalog",
  definition: "the songs and the artists who made them",
  partSlugs: [
    "module/lrclib-client",
    "module/lrclib-map",
    "module/lrclib-schema",
    "module/musicbrainz-client",
    "module/musicbrainz-map",
    "module/musicbrainz-schema",
    "module/song-slug",
    "page-type/artist",
    "page-type/artist-collection",
    "page-type/release",
    "page-type/release-collection",
    "page-type/song",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "MusicBrainz says what a song and an artist are.",
    },
    {
      invariantKind: "departure",
      statement: "LRCLIB says what the words of a song are.",
    },
  ],
} as const satisfies Domain
