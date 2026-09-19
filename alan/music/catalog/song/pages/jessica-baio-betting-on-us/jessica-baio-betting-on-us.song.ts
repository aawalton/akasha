import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioBettingOnUs = {
  id: "019ea4f7-26a1-7820-8e7f-e96122904bfa",
  type: "page-type/song",
  slug: "jessica-baio-betting-on-us",
  title: "betting on us",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "98ea4e6a-e2fb-4541-8c5d-a1ffe48d2de9",
      externalLink: "https://musicbrainz.org/recording/98ea4e6a-e2fb-4541-8c5d-a1ffe48d2de9",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
