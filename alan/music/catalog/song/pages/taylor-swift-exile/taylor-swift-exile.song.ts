import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftExile = {
  id: "019ea416-0e5f-7db8-9ea0-a2ff3b94df04",
  type: "page-type/song",
  slug: "taylor-swift-exile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "965c0731-790f-4a8b-b8cf-0ef0f7f7d0c1",
      externalLink: "https://musicbrainz.org/work/965c0731-790f-4a8b-b8cf-0ef0f7f7d0c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "exile",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:09.439Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
