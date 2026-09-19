import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHigherPower = {
  id: "01a0ba5d-3c6d-7292-9534-e45c3b777a4c",
  type: "page-type/song",
  slug: "coldplay-higher-power",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "42a36e72-dd10-4af6-b84a-17d64d7e12fb",
      externalLink: "https://musicbrainz.org/work/42a36e72-dd10-4af6-b84a-17d64d7e12fb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Power",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
