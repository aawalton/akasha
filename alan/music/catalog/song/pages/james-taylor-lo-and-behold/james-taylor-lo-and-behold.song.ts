import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLoAndBehold = {
  id: "01a0b72f-434c-7cfb-9aea-18b76603dcf1",
  type: "page-type/song",
  slug: "james-taylor-lo-and-behold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dcb00532-b0dd-3d06-9ee9-6a9fdbcbd569",
      externalLink: "https://musicbrainz.org/work/dcb00532-b0dd-3d06-9ee9-6a9fdbcbd569",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lo and Behold",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
