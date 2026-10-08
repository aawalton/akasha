import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelCollectedAdditionalMasters = {
  id: "01a0676a-d71b-700f-92a4-9e0308fdf473",
  type: "page-type/release",
  slug: "billy-joel-collected-additional-masters",
  title: "Collected Additional Masters",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 66.2692,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-11-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7aibAYQuwa2cU2OEmidqbt",
      externalLink: "https://open.spotify.com/album/7aibAYQuwa2cU2OEmidqbt",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
