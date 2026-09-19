import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioCatalyst = {
  id: "019ea4f7-3c99-798d-8a31-8bc89ed9d5c1",
  type: "page-type/song",
  slug: "jessica-baio-catalyst",
  title: "catalyst",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79b7c418-f5ea-417b-836d-062bdeec3489",
      externalLink: "https://musicbrainz.org/recording/79b7c418-f5ea-417b-836d-062bdeec3489",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
