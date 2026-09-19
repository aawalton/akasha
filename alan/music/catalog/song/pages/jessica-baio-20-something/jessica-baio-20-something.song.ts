import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaio20Something = {
  id: "019ea4f6-c8b4-7131-a28e-f3bee8660a46",
  type: "page-type/song",
  slug: "jessica-baio-20-something",
  title: "20 something",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20d0322b-d3bc-441c-811f-4ce95dd5435b",
      externalLink: "https://musicbrainz.org/recording/20d0322b-d3bc-441c-811f-4ce95dd5435b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
