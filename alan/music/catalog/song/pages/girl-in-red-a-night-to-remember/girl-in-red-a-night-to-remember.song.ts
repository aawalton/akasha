import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedANightToRemember = {
  id: "01a0b724-d4dd-7eef-ae0d-e6628f922d95",
  type: "page-type/song",
  slug: "girl-in-red-a-night-to-remember",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be93ca2b-bb54-4818-a015-59bd26c13a75",
      externalLink: "https://musicbrainz.org/work/be93ca2b-bb54-4818-a015-59bd26c13a75",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Night to Remember",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
