import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAllTheDjSLoveYouInNewYork = {
  id: "019ea4c2-a09a-7623-bcd0-4a527ddfeea2",
  type: "page-type/song",
  slug: "sia-all-the-dj-s-love-you-in-new-york",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "067e0333-4cbc-4c2a-bc08-9d254918abc8",
      externalLink: "https://musicbrainz.org/work/067e0333-4cbc-4c2a-bc08-9d254918abc8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All the DJ’s Love You In New York",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
