import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSingForMyLife = {
  id: "019ea4ce-76d5-7aa9-ad9f-c16c742761ea",
  type: "page-type/song",
  slug: "sia-sing-for-my-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6c9d0b0-3ec5-41e2-9b97-7e28f463ad1b",
      externalLink: "https://musicbrainz.org/work/e6c9d0b0-3ec5-41e2-9b97-7e28f463ad1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sing for My Life",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
