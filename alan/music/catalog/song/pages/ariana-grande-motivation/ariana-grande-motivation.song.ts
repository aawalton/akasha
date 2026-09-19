import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMotivation = {
  id: "019ea4e7-2f11-73c9-a53c-d21bb52420ef",
  type: "page-type/song",
  slug: "ariana-grande-motivation",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3d01a08-d801-4857-9563-a778bb7f1470",
      externalLink: "https://musicbrainz.org/work/b3d01a08-d801-4857-9563-a778bb7f1470",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Motivation",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
