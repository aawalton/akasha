import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaByYourSide = {
  id: "019ea4c3-7979-7224-a9df-cfdae613872a",
  type: "page-type/song",
  slug: "sia-by-your-side",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47ed8879-f008-41f4-9b43-9d0699f9801a",
      externalLink: "https://musicbrainz.org/work/47ed8879-f008-41f4-9b43-9d0699f9801a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "By Your Side",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:05:34.585Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
