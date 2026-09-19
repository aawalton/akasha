import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSympathyIsAKnife = {
  id: "019ea4e8-4810-7d8e-b10a-f1043c9c16d1",
  type: "page-type/song",
  slug: "ariana-grande-sympathy-is-a-knife",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f02efe54-3687-4f77-8702-c7d39254c5f8",
      externalLink: "https://musicbrainz.org/work/f02efe54-3687-4f77-8702-c7d39254c5f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sympathy is a knife",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
