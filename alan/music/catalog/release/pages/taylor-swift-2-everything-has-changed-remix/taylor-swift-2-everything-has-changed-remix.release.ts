import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2EverythingHasChangedRemix = {
  id: "01a0676a-d71d-703c-ad3d-eeb74e84d392",
  type: "page-type/release",
  slug: "taylor-swift-2-everything-has-changed-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2013-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7CoqvPGCLHm7LbgH2Pz9aY",
      externalLink: "https://open.spotify.com/album/7CoqvPGCLHm7LbgH2Pz9aY",
    },
  ],
  title: "Everything Has Changed (Remix)",
} as const satisfies Release
