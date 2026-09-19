import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterLadyMonroe = {
  id: "01a0b723-cae9-7e70-a892-be8f5e5ac83e",
  type: "page-type/song",
  slug: "sabrina-carpenter-lady-monroe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a33c3486-5be3-411e-9958-4ed6a5d68a87",
      externalLink: "https://musicbrainz.org/work/a33c3486-5be3-411e-9958-4ed6a5d68a87",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lady Monroe",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
