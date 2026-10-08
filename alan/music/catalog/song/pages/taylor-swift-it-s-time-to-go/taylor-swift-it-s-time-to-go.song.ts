import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftItSTimeToGo = {
  id: "019ea416-2b25-7388-bfad-de2c3e59ae6b",
  type: "page-type/song",
  slug: "taylor-swift-it-s-time-to-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e7359c65-074a-4cc2-bfe1-83fbf72a72d9",
      externalLink: "https://musicbrainz.org/work/e7359c65-074a-4cc2-bfe1-83fbf72a72d9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "it’s time to go",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:16.805Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
