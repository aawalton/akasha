import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonYouLoveWhoYouLove = {
  id: "019ea4a2-9ef4-7053-a968-d5445d7a9ad7",
  type: "page-type/song",
  slug: "zara-larsson-you-love-who-you-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "780537d8-6fd0-4e79-88eb-8a647d51f81e",
      externalLink: "https://musicbrainz.org/work/780537d8-6fd0-4e79-88eb-8a647d51f81e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Love Who You Love",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
