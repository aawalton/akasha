import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSummerRain = {
  id: "019ea4cb-2894-7749-b56b-2b3dfc11c7b2",
  type: "page-type/song",
  slug: "sia-summer-rain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "255cdb64-7664-4ba1-9faa-33165824c650",
      externalLink: "https://musicbrainz.org/work/255cdb64-7664-4ba1-9faa-33165824c650",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Summer Rain",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:13:58.164Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
