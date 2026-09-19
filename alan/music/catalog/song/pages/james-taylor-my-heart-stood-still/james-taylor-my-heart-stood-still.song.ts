import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMyHeartStoodStill = {
  id: "01a0b72f-3cff-73d0-8a03-bffe9b00050b",
  type: "page-type/song",
  slug: "james-taylor-my-heart-stood-still",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9aeb803-1185-3f59-98b0-2d4413756389",
      externalLink: "https://musicbrainz.org/work/a9aeb803-1185-3f59-98b0-2d4413756389",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Heart Stood Still",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
