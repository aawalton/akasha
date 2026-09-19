import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioMadeForYou = {
  id: "019ea4f8-2d3f-717f-b103-35f807a24e2e",
  type: "page-type/song",
  slug: "jessica-baio-made-for-you",
  title: "made for you",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "106b4105-5895-4d02-88b7-4f528617ba79",
      externalLink: "https://musicbrainz.org/recording/106b4105-5895-4d02-88b7-4f528617ba79",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
