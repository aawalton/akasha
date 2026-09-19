import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sia11 = {
  id: "019ea4c3-5d98-752e-9986-d118e3c1499e",
  type: "page-type/song",
  slug: "sia-1-1",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "448c69ca-3dd4-460c-be68-82f4af316f1a",
      externalLink: "https://musicbrainz.org/work/448c69ca-3dd4-460c-be68-82f4af316f1a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "1+1",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
