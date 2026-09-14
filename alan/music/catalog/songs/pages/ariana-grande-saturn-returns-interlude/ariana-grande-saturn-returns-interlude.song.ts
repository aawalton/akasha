import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const arianaGrandeSaturnReturnsInterlude = {
  id: "019ea4e4-7950-710d-8b2e-7c716d5f25db",
  type: "song",
  slug: "ariana-grande-saturn-returns-interlude",
  title: "Saturn Returns Interlude",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ef45a47-cdbf-405d-8694-fa3f712978f8",
      externalLink: "https://musicbrainz.org/work/2ef45a47-cdbf-405d-8694-fa3f712978f8",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
