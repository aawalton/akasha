import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSoLongLondon = {
  id: "019ea416-3a77-7cfc-b4e9-4c2f036e9a97",
  type: "page-type/song",
  slug: "taylor-swift-so-long-london",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab39894b-127f-4791-a3d5-408bcb7c9d4c",
      externalLink: "https://musicbrainz.org/work/ab39894b-127f-4791-a3d5-408bcb7c9d4c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "So Long, London",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:20.727Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
