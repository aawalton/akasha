import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSweetBabyJames = {
  id: "01a0b72f-5107-7b27-934e-204cbf29dc8f",
  type: "page-type/song",
  slug: "james-taylor-sweet-baby-james",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0b8ea3c-9705-3507-927d-835eef5651d3",
      externalLink: "https://musicbrainz.org/work/a0b8ea3c-9705-3507-927d-835eef5651d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweet Baby James",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
