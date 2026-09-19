import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBeautifulCalmDriving = {
  id: "019ea4c4-cec4-7484-b8d7-fbdd18f1331f",
  type: "page-type/song",
  slug: "sia-beautiful-calm-driving",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8be5e914-8127-4c76-80f5-4c3cd75a4d23",
      externalLink: "https://musicbrainz.org/work/8be5e914-8127-4c76-80f5-4c3cd75a4d23",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Calm Driving",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
