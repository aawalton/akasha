import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayClocks = {
  id: "01a0ba5d-3cf9-7760-bb5f-55f4cd5bdc1a",
  type: "page-type/song",
  slug: "coldplay-clocks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4effe07f-4d53-3975-8fa0-18a94559401e",
      externalLink: "https://musicbrainz.org/work/4effe07f-4d53-3975-8fa0-18a94559401e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clocks",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
