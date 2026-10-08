import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBetterLeftUnsaid = {
  id: "019ea4e0-f86d-71c1-a9c6-d8fc3bf775c5",
  type: "page-type/song",
  slug: "ariana-grande-better-left-unsaid",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a138a8e-a49d-47e4-bd8b-9fbe2e406661",
      externalLink: "https://musicbrainz.org/work/3a138a8e-a49d-47e4-bd8b-9fbe2e406661",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Better Left Unsaid",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:37:47.629Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
