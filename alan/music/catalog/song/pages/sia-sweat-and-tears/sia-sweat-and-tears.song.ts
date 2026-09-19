import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSweatAndTears = {
  id: "019ea4ce-6e8a-74c6-9731-6b1e412d5af0",
  type: "page-type/song",
  slug: "sia-sweat-and-tears",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e62b8ceb-e3d9-4913-ac0d-80b6632139d2",
      externalLink: "https://musicbrainz.org/work/e62b8ceb-e3d9-4913-ac0d-80b6632139d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweat and Tears",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
