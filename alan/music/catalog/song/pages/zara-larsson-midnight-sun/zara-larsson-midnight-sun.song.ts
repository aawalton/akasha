import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMidnightSun = {
  id: "019ea4a1-4dc0-7310-b59f-6c53e68f7068",
  type: "page-type/song",
  slug: "zara-larsson-midnight-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0928fd0-d8b8-4d60-a769-2ad8c43ce141",
      externalLink: "https://musicbrainz.org/work/c0928fd0-d8b8-4d60-a769-2ad8c43ce141",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight Sun",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:28:15.168Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
