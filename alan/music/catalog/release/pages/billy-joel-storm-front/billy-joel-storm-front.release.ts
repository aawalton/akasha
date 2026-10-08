import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelStormFront = {
  id: "01a0676a-d72a-7025-a79a-6a59496bfc6d",
  type: "page-type/release",
  slug: "billy-joel-storm-front",
  title: "Storm Front",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 44.649283,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1989-10-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Vw2uoVkLAJFVViJ1QyK1D",
      externalLink: "https://open.spotify.com/album/1Vw2uoVkLAJFVViJ1QyK1D",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
