import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioLifeJacket = {
  id: "019ea4f8-0ddc-7c2a-b923-8935b1617cd7",
  type: "page-type/song",
  slug: "jessica-baio-life-jacket",
  title: "life jacket",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5ba7eef-426c-4497-90e0-cf9c99fd30ae",
      externalLink: "https://musicbrainz.org/recording/c5ba7eef-426c-4497-90e0-cf9c99fd30ae",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
