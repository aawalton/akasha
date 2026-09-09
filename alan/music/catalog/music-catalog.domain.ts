import type { Domain } from "../../../domains/domain.page-type.ts"

export const musicCatalog = {
  id: "01a06238-8d2c-7f24-81f1-c8b7232268d3",
  pageTypeSlug: "domain",
  slug: "music-catalog",
  definition: "the songs and the artists who made them",
  parts: [
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
      statement: "MusicBrainz defines a song and an artist.",
    },
    {
      invariantKind: "departure",
      statement: "LRCLIB states the words of a song.",
    },
  ],
} as const satisfies Domain
