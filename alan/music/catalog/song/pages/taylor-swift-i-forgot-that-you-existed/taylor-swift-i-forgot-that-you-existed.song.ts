import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIForgotThatYouExisted = {
  id: "019ea416-2cc7-7ccf-a2f7-dddb4618e9c3",
  type: "page-type/song",
  slug: "taylor-swift-i-forgot-that-you-existed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f7c9675a-121c-4ebf-88c8-a07535177caf",
      externalLink: "https://musicbrainz.org/work/f7c9675a-121c-4ebf-88c8-a07535177caf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Forgot That You Existed",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
