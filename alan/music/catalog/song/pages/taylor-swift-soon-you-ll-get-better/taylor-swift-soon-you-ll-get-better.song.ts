import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSoonYouLlGetBetter = {
  id: "019ea416-37ed-76c1-b766-cba8308cef95",
  type: "page-type/song",
  slug: "taylor-swift-soon-you-ll-get-better",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a21272b-af1c-4b76-91f2-e0b8145fb48b",
      externalLink: "https://musicbrainz.org/work/7a21272b-af1c-4b76-91f2-e0b8145fb48b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soon You’ll Get Better",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:20.077Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
