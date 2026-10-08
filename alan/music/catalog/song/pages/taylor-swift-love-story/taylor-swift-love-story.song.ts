import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLoveStory = {
  id: "019ea416-2991-7967-a7f8-be169198a2ac",
  type: "page-type/song",
  slug: "taylor-swift-love-story",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c8975007-ba64-3e81-9a3c-69a3ba2fab95",
      externalLink: "https://musicbrainz.org/work/c8975007-ba64-3e81-9a3c-69a3ba2fab95",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Story",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:16.401Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
