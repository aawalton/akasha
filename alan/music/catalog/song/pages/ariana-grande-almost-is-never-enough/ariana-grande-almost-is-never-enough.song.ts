import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAlmostIsNeverEnough = {
  id: "019ea4e2-4dce-7dce-b709-f5756573ebaf",
  type: "page-type/song",
  slug: "ariana-grande-almost-is-never-enough",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8f2f0e2f-4b0e-48ac-a9f4-a6fe2b5a7c24",
      externalLink: "https://musicbrainz.org/work/8f2f0e2f-4b0e-48ac-a9f4-a6fe2b5a7c24",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Almost Is Never Enough",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
