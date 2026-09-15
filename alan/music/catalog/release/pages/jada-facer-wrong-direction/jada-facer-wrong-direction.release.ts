import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerWrongDirection = {
  id: "01a0676a-d731-703f-a94c-91bf14b67ce0",
  type: "page-type/release",
  slug: "jada-facer-wrong-direction",
  title: "Wrong Direction",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.088,
  ownProgress: 3.088,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-02-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gplWCYxnLtCP7uOlHNJO0",
      externalLink: "https://open.spotify.com/album/1gplWCYxnLtCP7uOlHNJO0",
    },
  ],
} as const satisfies Release
