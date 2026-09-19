import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOriginal = {
  id: "019ea4cc-1fb3-779e-a221-fa63e936e743",
  type: "page-type/song",
  slug: "sia-original",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "448bcf04-8514-4c9d-b650-54c4556ba784",
      externalLink: "https://musicbrainz.org/work/448bcf04-8514-4c9d-b650-54c4556ba784",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Original",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
