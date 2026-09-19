import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAllInYourHead = {
  id: "019ea4c4-5b1b-78b3-ab58-4429c0f05b65",
  type: "page-type/song",
  slug: "sia-all-in-your-head",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7974fdb3-4954-4018-8e62-89c8e3368f04",
      externalLink: "https://musicbrainz.org/work/7974fdb3-4954-4018-8e62-89c8e3368f04",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All in Your Head",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
