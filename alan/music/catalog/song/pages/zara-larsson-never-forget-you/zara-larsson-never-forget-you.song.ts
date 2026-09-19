import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonNeverForgetYou = {
  id: "019ea49e-a3ad-7d4a-88dc-65183cda6c61",
  type: "page-type/song",
  slug: "zara-larsson-never-forget-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ad92e9a-0981-42da-95fc-e654659a8b98",
      externalLink: "https://musicbrainz.org/work/2ad92e9a-0981-42da-95fc-e654659a8b98",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Forget You",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
