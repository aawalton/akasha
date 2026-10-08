import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaChasingShadows = {
  id: "019ea4c4-2be4-7c75-8b87-374b965a64aa",
  type: "page-type/song",
  slug: "sia-chasing-shadows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7425a023-3dbf-4a62-852e-8ceddd2c9422",
      externalLink: "https://musicbrainz.org/work/7425a023-3dbf-4a62-852e-8ceddd2c9422",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chasing Shadows",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:06:20.260Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
