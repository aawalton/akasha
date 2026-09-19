import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWichitaLineman = {
  id: "01a0b72f-56b0-7d6b-b13b-1df16783ebe1",
  type: "page-type/song",
  slug: "james-taylor-wichita-lineman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d42c125d-3c05-3a60-9ebb-732c76e17a6a",
      externalLink: "https://musicbrainz.org/work/d42c125d-3c05-3a60-9ebb-732c76e17a6a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wichita Lineman",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
