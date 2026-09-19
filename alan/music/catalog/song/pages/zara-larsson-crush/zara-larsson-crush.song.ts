import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonCrush = {
  id: "019ea4a0-41a6-7737-9b1b-95bb9ee5eb0b",
  type: "page-type/song",
  slug: "zara-larsson-crush",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85ce57fd-c2d6-47d1-bcda-7d3ca25812f7",
      externalLink: "https://musicbrainz.org/work/85ce57fd-c2d6-47d1-bcda-7d3ca25812f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crush",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
