import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLucky = {
  id: "019ea4ca-6de9-7ff9-b26b-3d1f46d4c04b",
  type: "page-type/song",
  slug: "sia-lucky",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fbc05650-dcc5-4f6a-a3b6-577ce11991c2",
      externalLink: "https://musicbrainz.org/work/fbc05650-dcc5-4f6a-a3b6-577ce11991c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lucky",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
