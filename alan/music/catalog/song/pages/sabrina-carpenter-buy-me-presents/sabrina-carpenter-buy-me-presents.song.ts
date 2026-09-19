import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBuyMePresents = {
  id: "01a0b723-bfc8-7ea3-8ace-cc0c6f5e3171",
  type: "page-type/song",
  slug: "sabrina-carpenter-buy-me-presents",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "024d4f88-547e-4933-9119-ac6fa570a509",
      externalLink: "https://musicbrainz.org/work/024d4f88-547e-4933-9119-ac6fa570a509",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "buy me presents",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
