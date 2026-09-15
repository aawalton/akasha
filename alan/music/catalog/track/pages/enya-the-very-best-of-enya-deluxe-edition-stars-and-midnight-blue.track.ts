import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheVeryBestOfEnyaDeluxeEditionStarsAndMidnightBlue = {
  id: "01a0a5b0-2870-7203-af3d-c48b5cd973be",
  type: "page-type/track",
  slug: "enya-the-very-best-of-enya-deluxe-edition-stars-and-midnight-blue",
  ownLength: 3.14555,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-very-best-of-enya-deluxe-edition"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Ye60nwGEy04nWyzsRKW80",
      externalLink: "https://open.spotify.com/track/6Ye60nwGEy04nWyzsRKW80",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Stars and Midnight Blue",
} as const satisfies Track
