import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSilentNight = {
  id: "01a0b783-eb22-733a-8d91-7ce719c5d052",
  type: "page-type/song",
  slug: "zara-larsson-silent-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      externalLink: "https://musicbrainz.org/work/590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silent Night",
  artist: "artist/zara-larsson",
  songType: "derivative",
  performed: true,
} as const satisfies Song
