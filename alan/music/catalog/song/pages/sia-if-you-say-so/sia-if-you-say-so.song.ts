import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIfYouSaySo = {
  id: "019ea4c9-46a6-7b3c-976d-992f3779c1d9",
  type: "page-type/song",
  slug: "sia-if-you-say-so",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97bbae2b-f62b-4280-9dd9-1f948de84e2c",
      externalLink: "https://musicbrainz.org/work/97bbae2b-f62b-4280-9dd9-1f948de84e2c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If You Say So",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
