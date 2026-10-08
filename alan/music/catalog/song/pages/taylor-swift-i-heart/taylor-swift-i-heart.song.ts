import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIHeart = {
  id: "019ea416-20f0-7bed-be51-b483fa92fa50",
  type: "page-type/song",
  slug: "taylor-swift-i-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6e896a62-9676-4c13-97b7-9f792fb4cb86",
      externalLink: "https://musicbrainz.org/work/6e896a62-9676-4c13-97b7-9f792fb4cb86",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Heart ?",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:14.192Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
