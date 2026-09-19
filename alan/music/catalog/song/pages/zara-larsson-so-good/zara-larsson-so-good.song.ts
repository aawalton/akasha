import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSoGood = {
  id: "019ea4a1-6eaf-7d3b-893f-b8fdf6f9dfb0",
  type: "page-type/song",
  slug: "zara-larsson-so-good",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3544839-37a7-46f9-adce-dfeb8d2c95ce",
      externalLink: "https://musicbrainz.org/work/c3544839-37a7-46f9-adce-dfeb8d2c95ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "So Good",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
