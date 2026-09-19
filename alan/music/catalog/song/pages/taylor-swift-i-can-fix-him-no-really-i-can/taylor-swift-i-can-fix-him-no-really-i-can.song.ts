import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftICanFixHimNoReallyICan = {
  id: "019ea416-2c60-7966-a896-e67907f279ce",
  type: "page-type/song",
  slug: "taylor-swift-i-can-fix-him-no-really-i-can",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f618d7d3-51c2-4d66-be38-5cf28777ec8e",
      externalLink: "https://musicbrainz.org/work/f618d7d3-51c2-4d66-be38-5cf28777ec8e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Can Fix Him (No Really I Can)",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
