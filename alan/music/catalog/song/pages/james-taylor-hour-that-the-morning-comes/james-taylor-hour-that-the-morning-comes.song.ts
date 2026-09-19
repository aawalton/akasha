import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHourThatTheMorningComes = {
  id: "01a0b72f-234d-7a9e-9a7e-08860ae5abb6",
  type: "page-type/song",
  slug: "james-taylor-hour-that-the-morning-comes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37d506e4-c280-4a2a-9092-5586ab3e0e0c",
      externalLink: "https://musicbrainz.org/work/37d506e4-c280-4a2a-9092-5586ab3e0e0c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hour That the Morning Comes",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
