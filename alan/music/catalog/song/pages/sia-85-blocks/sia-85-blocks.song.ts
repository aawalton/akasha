import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sia85Blocks = {
  id: "019ea4c4-e148-7845-975b-5ae06d0c2107",
  type: "page-type/song",
  slug: "sia-85-blocks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "96546018-551d-4180-9a92-4f7a42084749",
      externalLink: "https://musicbrainz.org/work/96546018-551d-4180-9a92-4f7a42084749",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "85 Blocks",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:07:06.696Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
