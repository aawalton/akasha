import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBornBlue = {
  id: "019ea4aa-5b7e-757c-9549-2bee3c6165b9",
  type: "page-type/song",
  slug: "billie-eilish-born-blue",
  title: "BORN BLUE",
  artist: "artist/billie-eilish",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a964dbd-c714-43bf-87d6-72d5089d1fd4",
      externalLink: "https://musicbrainz.org/work/8a964dbd-c714-43bf-87d6-72d5089d1fd4",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
