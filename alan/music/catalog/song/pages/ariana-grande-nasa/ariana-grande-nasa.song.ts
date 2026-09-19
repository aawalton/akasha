import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNasa = {
  id: "019ea4e7-ab9c-748c-b131-248087eab2de",
  type: "page-type/song",
  slug: "ariana-grande-nasa",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d62ba737-11ca-4ae3-bdf4-93b3205dd15e",
      externalLink: "https://musicbrainz.org/work/d62ba737-11ca-4ae3-bdf4-93b3205dd15e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "NASA",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
