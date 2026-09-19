import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioCrossedTheLine = {
  id: "019ea4f7-4438-75d3-989d-011d6daba1a8",
  type: "page-type/song",
  slug: "jessica-baio-crossed-the-line",
  title: "crossed the line",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d7d14bd4-03a2-4d3d-b562-c5e85a807576",
      externalLink: "https://musicbrainz.org/recording/d7d14bd4-03a2-4d3d-b562-c5e85a807576",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
