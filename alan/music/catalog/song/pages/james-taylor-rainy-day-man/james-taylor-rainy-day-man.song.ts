import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRainyDayMan = {
  id: "01a0b72f-3c4d-795f-9ae0-98bf99bd58a9",
  type: "page-type/song",
  slug: "james-taylor-rainy-day-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9b8d0fb1-a3bc-3377-8338-bb179a81af7e",
      externalLink: "https://musicbrainz.org/work/9b8d0fb1-a3bc-3377-8338-bb179a81af7e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rainy Day Man",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
