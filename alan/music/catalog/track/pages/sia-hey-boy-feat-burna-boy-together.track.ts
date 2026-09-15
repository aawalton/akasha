import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaHeyBoyFeatBurnaBoyTogether = {
  id: "01a0a59c-2cf2-7ef3-b40c-e52702e56b5b",
  type: "page-type/track",
  slug: "sia-hey-boy-feat-burna-boy-together",
  ownLength: 3.4201166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sia-hey-boy-feat-burna-boy"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7G1rv5U0c3ZoR5fNDrLwrY",
      externalLink: "https://open.spotify.com/track/7G1rv5U0c3ZoR5fNDrLwrY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Together",
} as const satisfies Track
