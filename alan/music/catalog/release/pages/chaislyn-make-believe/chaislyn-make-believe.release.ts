import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynMakeBelieve = {
  id: "01a0676a-d724-702d-b777-43b4c3e49f83",
  type: "page-type/release",
  slug: "chaislyn-make-believe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2024-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5l9wYwEdKQfhjRJIEuBOP6",
      externalLink: "https://open.spotify.com/album/5l9wYwEdKQfhjRJIEuBOP6",
    },
  ],
  title: "Make Believe",
} as const satisfies Release
