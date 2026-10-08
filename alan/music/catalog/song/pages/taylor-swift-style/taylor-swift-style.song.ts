import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftStyle = {
  id: "019ea416-41b9-7e35-ac22-c6550ee641ba",
  type: "page-type/song",
  slug: "taylor-swift-style",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4dd8235-123f-4f53-ac07-1fc070016c06",
      externalLink: "https://musicbrainz.org/work/f4dd8235-123f-4f53-ac07-1fc070016c06",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Style",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:22.585Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
