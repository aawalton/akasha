import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRed4am = {
  id: "01a0b724-d03a-7542-9ec0-25a6ac05e400",
  type: "page-type/song",
  slug: "girl-in-red-4am",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0158cbe7-d004-41fd-aa06-1f704a1cd43c",
      externalLink: "https://musicbrainz.org/work/0158cbe7-d004-41fd-aa06-1f704a1cd43c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "4am",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
