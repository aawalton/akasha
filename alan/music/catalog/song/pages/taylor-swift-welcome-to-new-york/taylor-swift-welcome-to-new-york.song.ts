import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWelcomeToNewYork = {
  id: "019ea416-4aaa-70c8-bebb-c4af64a7e7c6",
  type: "page-type/song",
  slug: "taylor-swift-welcome-to-new-york",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c97e9e09-1576-4767-b53d-0ebf8b0dc5bb",
      externalLink: "https://musicbrainz.org/work/c97e9e09-1576-4767-b53d-0ebf8b0dc5bb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Welcome to New York",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
