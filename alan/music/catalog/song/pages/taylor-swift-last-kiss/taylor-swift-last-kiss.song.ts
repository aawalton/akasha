import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLastKiss = {
  id: "019ea416-2924-746d-9e74-730991c9e505",
  type: "page-type/song",
  slug: "taylor-swift-last-kiss",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6bb2fc1-b7b2-3431-93cb-45fff525c007",
      externalLink: "https://musicbrainz.org/work/c6bb2fc1-b7b2-3431-93cb-45fff525c007",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Kiss",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
