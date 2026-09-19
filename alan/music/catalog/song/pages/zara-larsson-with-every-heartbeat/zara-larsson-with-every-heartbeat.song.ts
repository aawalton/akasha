import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWithEveryHeartbeat = {
  id: "019ea49f-c0e1-710b-b59f-d2fe0e751ffa",
  type: "page-type/song",
  slug: "zara-larsson-with-every-heartbeat",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e766fb6-184d-31e4-9a3c-54828ff78d38",
      externalLink: "https://musicbrainz.org/work/5e766fb6-184d-31e4-9a3c-54828ff78d38",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "With Every Heartbeat",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
