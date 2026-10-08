import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelStreetlifeSerenade = {
  id: "01a0676a-d72a-7030-844c-d2afe79e4ff4",
  type: "page-type/release",
  slug: "billy-joel-streetlife-serenade",
  title: "Streetlife Serenade",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 37.848183,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1974-10-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "57nvMIu4PQLLXRbmKESigL",
      externalLink: "https://open.spotify.com/album/57nvMIu4PQLLXRbmKESigL",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
