import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBeStill = {
  id: "019ea4af-2c2e-72f4-b958-f8930c99ba88",
  type: "page-type/song",
  slug: "kelly-clarkson-be-still",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8ba8260e-f8b4-4aca-a03c-feeab5376275",
      externalLink: "https://musicbrainz.org/work/8ba8260e-f8b4-4aca-a03c-feeab5376275",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Be Still",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
