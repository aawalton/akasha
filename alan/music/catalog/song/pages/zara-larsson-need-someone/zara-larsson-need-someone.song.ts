import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonNeedSomeone = {
  id: "019ea4a1-df96-749a-9cab-370b90c12c69",
  type: "page-type/song",
  slug: "zara-larsson-need-someone",
  title: "Need Someone",
  artist: "artist/zara-larsson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dc8a6976-ac04-479d-bcfa-bf67461c0376",
      externalLink: "https://musicbrainz.org/work/dc8a6976-ac04-479d-bcfa-bf67461c0376",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
