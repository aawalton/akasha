import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2WaterUnderTheBridge = {
  id: "01a0676a-d730-701d-903b-fb5359e53d4b",
  type: "page-type/release",
  slug: "celtic-woman-2-water-under-the-bridge",
  title: "Water Under the Bridge",
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  ownLength: 3.733333,
  ownProgress: 3.733333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-06-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oLWsGeuaNChQ5cNwbZNe1",
      externalLink: "https://open.spotify.com/album/3oLWsGeuaNChQ5cNwbZNe1",
    },
  ],
} as const satisfies Release
