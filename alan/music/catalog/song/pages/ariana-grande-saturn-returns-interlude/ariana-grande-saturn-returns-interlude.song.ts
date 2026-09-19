import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSaturnReturnsInterlude = {
  id: "019ea4e4-7950-710d-8b2e-7c716d5f25db",
  type: "page-type/song",
  slug: "ariana-grande-saturn-returns-interlude",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ef45a47-cdbf-405d-8694-fa3f712978f8",
      externalLink: "https://musicbrainz.org/work/2ef45a47-cdbf-405d-8694-fa3f712978f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Saturn Returns Interlude",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
