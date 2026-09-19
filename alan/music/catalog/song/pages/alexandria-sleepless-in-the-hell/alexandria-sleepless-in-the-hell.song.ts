import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaSleeplessInTheHell = {
  id: "01a0b726-900e-7457-9506-940b17d7e86a",
  type: "page-type/song",
  slug: "alexandria-sleepless-in-the-hell",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f2eb3ae6-da06-4934-a49c-8baa6f57d35a",
      externalLink: "https://musicbrainz.org/recording/f2eb3ae6-da06-4934-a49c-8baa6f57d35a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sleepless in the Hell",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
