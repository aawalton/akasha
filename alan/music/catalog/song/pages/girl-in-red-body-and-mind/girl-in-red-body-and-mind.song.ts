import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedBodyAndMind = {
  id: "01a0b724-d376-7fbe-b534-de4177c87edd",
  type: "page-type/song",
  slug: "girl-in-red-body-and-mind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8b73ae83-6fd1-4721-a1e7-a4b71b8cf45c",
      externalLink: "https://musicbrainz.org/work/8b73ae83-6fd1-4721-a1e7-a4b71b8cf45c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Body and Mind",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
