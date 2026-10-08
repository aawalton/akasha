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
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:10:55.241Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
