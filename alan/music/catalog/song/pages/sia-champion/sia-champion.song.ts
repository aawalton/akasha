import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaChampion = {
  id: "019ea4c5-ab64-7f86-8843-1d8e3fcd975e",
  type: "page-type/song",
  slug: "sia-champion",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c043b860-d3fc-4756-aab8-c789fdbdcb84",
      externalLink: "https://musicbrainz.org/work/c043b860-d3fc-4756-aab8-c789fdbdcb84",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Champion",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:07:58.436Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
