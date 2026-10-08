import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelColdSpringHarbor = {
  id: "01a0676a-d71b-700d-8215-7cc1523a2948",
  type: "page-type/release",
  slug: "billy-joel-cold-spring-harbor",
  title: "Cold Spring Harbor",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 29.8906,
  ownProgress: 29.8906,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1971-11-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "274rMlKrr22086ohmwAJZA",
      externalLink: "https://open.spotify.com/album/274rMlKrr22086ohmwAJZA",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
