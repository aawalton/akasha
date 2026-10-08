import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhiteHorse = {
  id: "019ea416-4b42-7adf-b3c6-d61026d8303e",
  type: "page-type/song",
  slug: "taylor-swift-white-horse",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d643d8f1-3d27-31d7-bc16-d863d7a3f9f9",
      externalLink: "https://musicbrainz.org/work/d643d8f1-3d27-31d7-bc16-d863d7a3f9f9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Horse",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:25.026Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
