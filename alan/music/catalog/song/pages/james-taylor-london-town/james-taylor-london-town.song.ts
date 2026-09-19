import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLondonTown = {
  id: "01a0b72f-40fd-7e1a-b5a0-2f044cd59feb",
  type: "page-type/song",
  slug: "james-taylor-london-town",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c8cba951-e1f2-42c7-8a01-9a8aa8539f6f",
      externalLink: "https://musicbrainz.org/work/c8cba951-e1f2-42c7-8a01-9a8aa8539f6f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "London Town",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
