import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineJust15 = {
  id: "01a0676a-d722-702e-855e-11f7004cd40f",
  type: "page-type/release",
  slug: "jenna-raine-just-15",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2025-11-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LBXud41nbrah1k83EYgs7",
      externalLink: "https://open.spotify.com/album/5LBXud41nbrah1k83EYgs7",
      lastSyncedAt: "2025-11-30",
    },
  ],
  title: "Just 15",
} as const satisfies Release
