import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterOldMe = {
  id: "01a0b723-cc62-7905-957b-d73999e43b94",
  type: "page-type/song",
  slug: "sabrina-carpenter-old-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b83190a8-6d43-46e6-a956-d99d99b7ef4a",
      externalLink: "https://musicbrainz.org/work/b83190a8-6d43-46e6-a956-d99d99b7ef4a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Old Me",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
