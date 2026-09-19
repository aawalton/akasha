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
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
