import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBabyI = {
  id: "019ea4e3-357e-7b20-8339-0f77ec0c6ad8",
  type: "page-type/song",
  slug: "ariana-grande-baby-i",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc4a9125-540b-436e-bc63-ecea09a9a9a8",
      externalLink: "https://musicbrainz.org/work/cc4a9125-540b-436e-bc63-ecea09a9a9a8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby I",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
