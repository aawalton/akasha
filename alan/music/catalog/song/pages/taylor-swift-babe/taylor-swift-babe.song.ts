import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBabe = {
  id: "019ea416-0f63-7225-b2c8-8885523f0c51",
  type: "page-type/song",
  slug: "taylor-swift-babe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c84f0cb-f2ca-453b-8f6a-8757aac76e78",
      externalLink: "https://musicbrainz.org/work/9c84f0cb-f2ca-453b-8f6a-8757aac76e78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Babe",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
