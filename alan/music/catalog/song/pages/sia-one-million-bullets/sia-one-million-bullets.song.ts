import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOneMillionBullets = {
  id: "019ea4c8-02c3-77b5-a72b-ecbb5d4efbaf",
  type: "page-type/song",
  slug: "sia-one-million-bullets",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "60552962-4585-4a7c-8f50-e5ebf03e7db1",
      externalLink: "https://musicbrainz.org/work/60552962-4585-4a7c-8f50-e5ebf03e7db1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Million Bullets",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
