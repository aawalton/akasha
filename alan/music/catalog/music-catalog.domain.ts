import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const musicCatalog = {
  id: "01a06238-8d2c-7f24-81f1-c8b7232268d3",
  type: "page-type/domain",
  slug: "music-catalog",
  definition: "the songs and the artists who made them",
  parts: [
    "module/catalogue-held",
    "module/lrclib-client",
    "module/lrclib-map",
    "module/lrclib-schema",
    "module/musicbrainz-client",
    "module/musicbrainz-map",
    "module/musicbrainz-schema",
    "module/catalogue-slug",
    "module/release-syncing",
    "module/song-filing",
    "module/song-matching",
    "module/song-words",
    "module/track-syncing",
    "page-type/artist",
    "page-type/artist-collection",
    "page-type/release",
    "page-type/release-collection",
    "page-type/song",
    "page-type/track",
    "service-workstation/spotify-sync",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "MusicBrainz names an artist and the songs MusicBrainz holds a record of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "LRCLIB states the words of a song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify states the releases an artist put out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No song waits on a record in MusicBrainz to be filed.",
    },
  ],
} as const satisfies Domain
