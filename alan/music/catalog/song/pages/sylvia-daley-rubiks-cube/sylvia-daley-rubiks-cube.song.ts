import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyRubiksCube = {
  id: "01a0b725-adc7-7055-8db6-860f5608b9cb",
  type: "page-type/song",
  slug: "sylvia-daley-rubiks-cube",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "014b7869-b4dc-4622-a3c9-986ac742a603",
      externalLink: "https://musicbrainz.org/work/014b7869-b4dc-4622-a3c9-986ac742a603",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rubik's Cube",
  artist: "artist/sylvia-daley",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
