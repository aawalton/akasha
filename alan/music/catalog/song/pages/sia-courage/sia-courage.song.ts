import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCourage = {
  id: "019ea4c2-f162-703e-af78-85e3f3445b89",
  type: "page-type/song",
  slug: "sia-courage",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "188179ca-00b1-4714-a42b-23e0dbcec1bd",
      externalLink: "https://musicbrainz.org/work/188179ca-00b1-4714-a42b-23e0dbcec1bd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Courage",
  artist: "artist/sia",
  performed: true,
  written: "collab",
  createdAt: "2026-06-08T01:04:59.746Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
