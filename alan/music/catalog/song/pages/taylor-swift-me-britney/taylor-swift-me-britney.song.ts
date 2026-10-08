import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMeBritney = {
  id: "019ea416-1fea-714e-b97a-4cf484bbfa10",
  type: "page-type/song",
  slug: "taylor-swift-me-britney",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "651091fc-69bb-4fdd-80f6-16d1d4dbb65a",
      externalLink: "https://musicbrainz.org/work/651091fc-69bb-4fdd-80f6-16d1d4dbb65a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Me & Britney",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
  createdAt: "2026-06-07T21:56:13.930Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
