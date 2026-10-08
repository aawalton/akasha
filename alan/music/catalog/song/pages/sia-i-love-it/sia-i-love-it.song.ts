import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaILoveIt = {
  id: "019ea4c6-e7ad-71ae-a859-f43cbcb30e8d",
  type: "page-type/song",
  slug: "sia-i-love-it",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "12f08b1a-f432-4e6b-85a7-3b0d206fc633",
      externalLink: "https://musicbrainz.org/work/12f08b1a-f432-4e6b-85a7-3b0d206fc633",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Love It",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:09:19.405Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
