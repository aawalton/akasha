import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonHoldingOutForYou = {
  id: "019ea49d-f146-7dbd-931c-7744cdb83d94",
  type: "page-type/song",
  slug: "zara-larsson-holding-out-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e2aa92d-cdf6-4d58-897c-794e827ce1a4",
      externalLink: "https://musicbrainz.org/work/0e2aa92d-cdf6-4d58-897c-794e827ce1a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Holding Out for You",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
