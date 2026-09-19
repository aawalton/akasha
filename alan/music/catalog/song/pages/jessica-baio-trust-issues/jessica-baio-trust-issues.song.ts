import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioTrustIssues = {
  id: "019ea4f8-fab3-78a4-b248-ef13a98dd604",
  type: "page-type/song",
  slug: "jessica-baio-trust-issues",
  title: "trust issues",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1912e513-8a5b-4472-a0d5-a28b7e7e02c2",
      externalLink: "https://musicbrainz.org/recording/1912e513-8a5b-4472-a0d5-a28b7e7e02c2",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
