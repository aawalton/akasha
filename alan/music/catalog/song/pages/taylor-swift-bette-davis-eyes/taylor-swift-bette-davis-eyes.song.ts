import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBetteDavisEyes = {
  id: "019ea416-12d0-7b96-b16f-78e18540ebef",
  type: "page-type/song",
  slug: "taylor-swift-bette-davis-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3b83946-e8f6-38e4-acdf-2da1e4b528b5",
      externalLink: "https://musicbrainz.org/work/b3b83946-e8f6-38e4-acdf-2da1e4b528b5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bette Davis Eyes",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:10.576Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
