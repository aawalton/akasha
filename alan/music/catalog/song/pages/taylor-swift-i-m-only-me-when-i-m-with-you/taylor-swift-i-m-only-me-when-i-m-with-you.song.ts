import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIMOnlyMeWhenIMWithYou = {
  id: "019ea416-2626-7fd4-b4df-88ac63226b95",
  type: "page-type/song",
  slug: "taylor-swift-i-m-only-me-when-i-m-with-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ffe06a7-31fd-4b7a-b5e0-4c2027200827",
      externalLink: "https://musicbrainz.org/work/9ffe06a7-31fd-4b7a-b5e0-4c2027200827",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Only Me When I’m With You",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
