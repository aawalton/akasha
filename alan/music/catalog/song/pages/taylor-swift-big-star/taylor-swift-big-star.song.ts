import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBigStar = {
  id: "019ea416-0c47-79e3-a65c-651f6e4d73d0",
  type: "page-type/song",
  slug: "taylor-swift-big-star",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "782535fa-fe6e-4279-a351-2bfefd864fc1",
      externalLink: "https://musicbrainz.org/work/782535fa-fe6e-4279-a351-2bfefd864fc1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Big Star",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:08.903Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
