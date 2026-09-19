import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheScientist = {
  id: "01a0ba5d-4ac7-7127-be72-0a1a832ea1a7",
  type: "page-type/song",
  slug: "coldplay-the-scientist",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "06bf7adc-f574-305b-b79a-263d9e99a55a",
      externalLink: "https://musicbrainz.org/work/06bf7adc-f574-305b-b79a-263d9e99a55a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Scientist",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
