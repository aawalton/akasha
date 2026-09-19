import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPassenger = {
  id: "019ea4cc-814c-79a5-8392-b26a98102b75",
  type: "page-type/song",
  slug: "sia-passenger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6454f6cc-24e7-4955-9f97-75918fa559ff",
      externalLink: "https://musicbrainz.org/work/6454f6cc-24e7-4955-9f97-75918fa559ff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Passenger",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
