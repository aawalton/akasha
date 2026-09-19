import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBreakupVacation = {
  id: "01a0b723-c10c-76e2-9327-6be46dc8ff24",
  type: "page-type/song",
  slug: "sabrina-carpenter-breakup-vacation",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1fd73817-170b-4a4e-a92d-fed39424ff4d",
      externalLink: "https://musicbrainz.org/work/1fd73817-170b-4a4e-a92d-fed39424ff4d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Breakup Vacation",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
