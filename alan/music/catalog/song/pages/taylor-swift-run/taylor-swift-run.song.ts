import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRun = {
  id: "019ea416-33ea-7103-a647-49d703b66dc9",
  type: "page-type/song",
  slug: "taylor-swift-run",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5848592f-01a6-4bb8-a66c-b1ce2feca85c",
      externalLink: "https://musicbrainz.org/work/5848592f-01a6-4bb8-a66c-b1ce2feca85c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Run",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
