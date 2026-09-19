import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioAccident = {
  id: "019ea4f6-d19a-7ca8-8d84-d3349629889a",
  type: "page-type/song",
  slug: "jessica-baio-accident",
  title: "accident",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "247d32af-0b49-4ea2-9a53-4ccfd8e16868",
      externalLink: "https://musicbrainz.org/recording/247d32af-0b49-4ea2-9a53-4ccfd8e16868",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
