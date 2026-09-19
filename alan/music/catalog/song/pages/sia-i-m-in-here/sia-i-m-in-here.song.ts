import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIMInHere = {
  id: "019ea4c9-afdb-761f-b0a8-fd1e940aff00",
  type: "page-type/song",
  slug: "sia-i-m-in-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b79acfb1-22ce-4e8a-ab88-6b864cdbecae",
      externalLink: "https://musicbrainz.org/work/b79acfb1-22ce-4e8a-ab88-6b864cdbecae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m in Here",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
