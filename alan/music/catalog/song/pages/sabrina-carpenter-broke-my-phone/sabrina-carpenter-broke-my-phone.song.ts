import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBrokeMyPhone = {
  id: "01a0b723-cf7f-7192-ba11-71f04d0d3612",
  type: "page-type/song",
  slug: "sabrina-carpenter-broke-my-phone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f499904e-fc7d-46a5-9bca-ac13ee1863e9",
      externalLink: "https://musicbrainz.org/work/f499904e-fc7d-46a5-9bca-ac13ee1863e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Broke My Phone",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
