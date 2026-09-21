import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeBangBang = {
  id: "01a0676a-d718-7015-bffb-347ff1067304",
  type: "page-type/release",
  slug: "ariana-grande-bang-bang",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-07-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4z9auB26ODtVUvLk7tc9xo",
      externalLink: "https://open.spotify.com/album/4z9auB26ODtVUvLk7tc9xo",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Bang Bang",
} as const satisfies Release
