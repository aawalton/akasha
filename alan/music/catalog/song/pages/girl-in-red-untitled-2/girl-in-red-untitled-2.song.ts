import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedUntitled2 = {
  id: "01a0b724-d614-77da-82bf-01d1d6024579",
  type: "page-type/song",
  slug: "girl-in-red-untitled-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ddda380c-2db5-4f75-9f5f-acb2b9281572",
      externalLink: "https://musicbrainz.org/work/ddda380c-2db5-4f75-9f5f-acb2b9281572",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: ".",
  artist: "artist/girl-in-red",
  performed: true,
  written: "solo",
} as const satisfies Song
