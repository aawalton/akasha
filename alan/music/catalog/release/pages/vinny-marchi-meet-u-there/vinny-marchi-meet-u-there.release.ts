import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiMeetUThere = {
  id: "01a0676a-d724-7049-94dd-73e33a28b4ad",
  type: "page-type/release",
  slug: "vinny-marchi-meet-u-there",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2021-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iKKPhwEZVIkxifDZOdpoM",
      externalLink: "https://open.spotify.com/album/4iKKPhwEZVIkxifDZOdpoM",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "meet U there",
} as const satisfies Release
