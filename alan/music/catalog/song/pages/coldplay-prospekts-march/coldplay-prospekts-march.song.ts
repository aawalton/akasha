import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayProspektsMarch = {
  id: "01a0ba60-f530-7ddb-b19e-60ceabafdd0f",
  type: "page-type/song",
  slug: "coldplay-prospekts-march",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "91d3f5d4-5cf8-3198-8b31-c23f47e7760a",
      externalLink: "https://musicbrainz.org/work/91d3f5d4-5cf8-3198-8b31-c23f47e7760a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Prospekt’s March",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
