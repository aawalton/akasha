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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
