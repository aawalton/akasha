import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonOnMyLove = {
  id: "019ea4a2-5c0a-7d06-9e50-a1ddcc9d2935",
  type: "page-type/song",
  slug: "zara-larsson-on-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fce41d89-b52d-455c-91e0-97343ebb6275",
      externalLink: "https://musicbrainz.org/work/fce41d89-b52d-455c-91e0-97343ebb6275",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "On My Love",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
