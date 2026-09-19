import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAnotherDay = {
  id: "01a0b72f-2039-7ebb-ae84-1978b6a40c6b",
  type: "page-type/song",
  slug: "james-taylor-another-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d618139-fd1e-44fd-bac2-1f5daba726d1",
      externalLink: "https://musicbrainz.org/work/0d618139-fd1e-44fd-bac2-1f5daba726d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Another Day",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
