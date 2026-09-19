import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedGirls = {
  id: "01a0b724-d327-718b-aed9-8bb4e4bddb41",
  type: "page-type/song",
  slug: "girl-in-red-girls",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79aa6b4d-7fe7-4686-bc0e-6bfd45be7f95",
      externalLink: "https://musicbrainz.org/work/79aa6b4d-7fe7-4686-bc0e-6bfd45be7f95",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "girls",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
