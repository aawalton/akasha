import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWaterfall = {
  id: "019ea4cd-dd0a-70a8-b737-03aa5f82c731",
  type: "page-type/song",
  slug: "sia-waterfall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b83dcb70-fbd8-4bb9-aefe-a6b25ebf0897",
      externalLink: "https://musicbrainz.org/work/b83dcb70-fbd8-4bb9-aefe-a6b25ebf0897",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Waterfall",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:16:55.434Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
