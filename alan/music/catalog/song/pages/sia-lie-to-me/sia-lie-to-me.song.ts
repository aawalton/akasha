import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLieToMe = {
  id: "019ea4c8-5e09-748d-a726-25b555dd1295",
  type: "page-type/song",
  slug: "sia-lie-to-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7010ab99-bcb0-48a6-b5c1-54c875a45ae3",
      externalLink: "https://musicbrainz.org/work/7010ab99-bcb0-48a6-b5c1-54c875a45ae3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lie to Me",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
