import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedRue = {
  id: "01a0b724-d53e-7391-8ded-b7d04b7c6e40",
  type: "page-type/song",
  slug: "girl-in-red-rue",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4a94fdf-b234-4f69-ad8a-4f81e5973b6f",
      externalLink: "https://musicbrainz.org/work/c4a94fdf-b234-4f69-ad8a-4f81e5973b6f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "rue",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
