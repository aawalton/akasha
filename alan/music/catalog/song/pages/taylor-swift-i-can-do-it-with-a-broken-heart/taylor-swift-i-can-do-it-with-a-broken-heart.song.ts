import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftICanDoItWithABrokenHeart = {
  id: "019ea416-25bf-765a-a2bf-ae5aa548e964",
  type: "page-type/song",
  slug: "taylor-swift-i-can-do-it-with-a-broken-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9f2009b4-a116-45a5-87c9-f8c9ebc1c946",
      externalLink: "https://musicbrainz.org/work/9f2009b4-a116-45a5-87c9-f8c9ebc1c946",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Can Do It With a Broken Heart",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
