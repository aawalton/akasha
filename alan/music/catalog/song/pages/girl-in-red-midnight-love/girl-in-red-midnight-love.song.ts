import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedMidnightLove = {
  id: "01a0b724-d15c-77f8-ac3e-d744b2ddc550",
  type: "page-type/song",
  slug: "girl-in-red-midnight-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2a3f81c2-76ef-4842-9b19-3b91c210d9bc",
      externalLink: "https://musicbrainz.org/work/2a3f81c2-76ef-4842-9b19-3b91c210d9bc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "midnight love",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
