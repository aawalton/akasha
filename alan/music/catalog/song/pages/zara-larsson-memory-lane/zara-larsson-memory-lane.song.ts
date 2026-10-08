import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMemoryLane = {
  id: "019ea49e-9059-7270-817a-7f0042d714c1",
  type: "page-type/song",
  slug: "zara-larsson-memory-lane",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27ace0fb-2564-40b9-b669-0b1ffdf0bb77",
      externalLink: "https://musicbrainz.org/work/27ace0fb-2564-40b9-b669-0b1ffdf0bb77",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Memory Lane",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:25:15.609Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
