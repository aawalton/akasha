import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLiveInBuenosAires = {
  id: "01a0676a-d723-704f-86dc-ef508619b6bd",
  type: "page-type/release",
  slug: "coldplay-live-in-buenos-aires",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2018-12-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "19CvkGjYpifkdwgVJSbog2",
      externalLink: "https://open.spotify.com/album/19CvkGjYpifkdwgVJSbog2",
    },
  ],
  title: "Live in Buenos Aires",
} as const satisfies Release
