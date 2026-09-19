import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTricky = {
  id: "01a0b723-d552-74f3-a271-3ecfb7230644",
  type: "page-type/song",
  slug: "sabrina-carpenter-tricky",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "81548abb-ee7d-45d1-a702-085d536b4cdc",
      externalLink: "https://musicbrainz.org/work/81548abb-ee7d-45d1-a702-085d536b4cdc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tricky",
  artist: "artist/sabrina-carpenter",
  performed: true,
  written: "collab",
} as const satisfies Song
