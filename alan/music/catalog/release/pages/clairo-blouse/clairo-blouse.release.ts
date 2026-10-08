import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoBlouse = {
  id: "01a0676a-d719-701a-bbc6-1ee5540cb585",
  type: "page-type/release",
  slug: "clairo-blouse",
  title: "Blouse",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 3.256267,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-06-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1t9GLJU4I8KOrXM86qGJCo",
      externalLink: "https://open.spotify.com/album/1t9GLJU4I8KOrXM86qGJCo",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-15T16:34:44.000Z",
} as const satisfies Release
