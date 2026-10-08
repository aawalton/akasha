import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRoyals = {
  id: "01a0ba97-7759-7e8d-bec1-fec9ee4b0c8f",
  type: "page-type/song",
  slug: "taylor-swift-royals",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b44e94f0-c5c7-4805-a593-c7d9fa696d71",
      externalLink: "https://musicbrainz.org/work/b44e94f0-c5c7-4805-a593-c7d9fa696d71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Royals",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-09-19T16:54:43.801Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
