import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterGoodProblemToHave = {
  id: "01a0b723-c560-7927-925d-56ec10af82e7",
  type: "page-type/song",
  slug: "sabrina-carpenter-good-problem-to-have",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "553e8946-cbcc-413a-a995-acceb02ad5b9",
      externalLink: "https://musicbrainz.org/work/553e8946-cbcc-413a-a995-acceb02ad5b9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Good Problem To Have",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
