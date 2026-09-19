import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedSerotonin = {
  id: "01a0b724-d632-7b79-bdf7-750884e7739c",
  type: "page-type/song",
  slug: "girl-in-red-serotonin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f31da348-90ef-4583-b98a-a19d4d6098d3",
      externalLink: "https://musicbrainz.org/work/f31da348-90ef-4583-b98a-a19d4d6098d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Serotonin",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
