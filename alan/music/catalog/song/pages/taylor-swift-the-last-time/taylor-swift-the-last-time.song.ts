import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheLastTime = {
  id: "019ea416-3aa9-7d5a-bd70-13bfbfbb02dd",
  type: "page-type/song",
  slug: "taylor-swift-the-last-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b0b11e8b-2f0d-43e9-8112-d9831bd0981a",
      externalLink: "https://musicbrainz.org/work/b0b11e8b-2f0d-43e9-8112-d9831bd0981a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Last Time",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
