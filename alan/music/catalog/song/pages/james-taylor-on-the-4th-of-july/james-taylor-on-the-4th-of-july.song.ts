import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOnThe4thOfJuly = {
  id: "01a0b72f-338c-7181-9d7d-a13f70ed772a",
  type: "page-type/song",
  slug: "james-taylor-on-the-4th-of-july",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2548862b-40ea-4b39-babb-a595bc17bc2e",
      externalLink: "https://musicbrainz.org/work/2548862b-40ea-4b39-babb-a595bc17bc2e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "On the 4th of July",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
