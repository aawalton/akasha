import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedNewLove = {
  id: "01a0b724-d0af-7d99-b372-e29a08fcb742",
  type: "page-type/song",
  slug: "girl-in-red-new-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "16b49627-15f1-44cc-bdca-88aff32b3da0",
      externalLink: "https://musicbrainz.org/work/16b49627-15f1-44cc-bdca-88aff32b3da0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "New Love",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
