import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioStartOver = {
  id: "019ea4f8-ed1a-74eb-8a57-80d177f0bb38",
  type: "page-type/song",
  slug: "jessica-baio-start-over",
  title: "start over",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e28ea4df-0488-4965-917b-4f1a7825958c",
      externalLink: "https://musicbrainz.org/recording/e28ea4df-0488-4965-917b-4f1a7825958c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
