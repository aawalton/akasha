import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaStandingOnTheSunRemix = {
  id: "019ea4ce-8c36-7443-8c28-82a1c98fe532",
  type: "page-type/song",
  slug: "sia-standing-on-the-sun-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f07d0ed6-fc49-4b9f-be64-86335433427b",
      externalLink: "https://musicbrainz.org/work/f07d0ed6-fc49-4b9f-be64-86335433427b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Standing on the Sun Remix",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
