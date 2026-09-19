import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSuzanne = {
  id: "01a0b72f-4ffa-7ec5-ab08-e4b28bffacdb",
  type: "page-type/song",
  slug: "james-taylor-suzanne",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "87589fa7-1924-3089-932d-f6c3dc113937",
      externalLink: "https://musicbrainz.org/work/87589fa7-1924-3089-932d-f6c3dc113937",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Suzanne",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
