import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTrueLove = {
  id: "019ea4e7-0bf3-7adf-a07a-484633c40cc5",
  type: "page-type/song",
  slug: "ariana-grande-true-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9e509b1-f1f8-4a7a-8593-5d03daae408b",
      externalLink: "https://musicbrainz.org/work/a9e509b1-f1f8-4a7a-8593-5d03daae408b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "True Love",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
