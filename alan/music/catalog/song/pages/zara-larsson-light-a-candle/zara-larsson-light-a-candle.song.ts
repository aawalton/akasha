import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonLightACandle = {
  id: "019ea4a0-789d-76d0-b90c-62cfbb35959f",
  type: "page-type/song",
  slug: "zara-larsson-light-a-candle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90aaa309-d42a-475c-8107-bed68bac16ea",
      externalLink: "https://musicbrainz.org/work/90aaa309-d42a-475c-8107-bed68bac16ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Light a Candle",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
