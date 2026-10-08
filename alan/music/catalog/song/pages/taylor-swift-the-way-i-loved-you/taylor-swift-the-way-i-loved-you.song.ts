import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheWayILovedYou = {
  id: "019ea416-4a42-7c41-8196-5734e2d381a2",
  type: "page-type/song",
  slug: "taylor-swift-the-way-i-loved-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bbd98f0f-98d6-34b0-b927-55dff9c1b8eb",
      externalLink: "https://musicbrainz.org/work/bbd98f0f-98d6-34b0-b927-55dff9c1b8eb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Way I Loved You",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:24.770Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
