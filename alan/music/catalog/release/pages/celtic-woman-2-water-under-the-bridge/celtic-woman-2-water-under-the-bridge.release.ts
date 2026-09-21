import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2WaterUnderTheBridge = {
  id: "01a0676a-d730-701d-903b-fb5359e53d4b",
  type: "page-type/release",
  slug: "celtic-woman-2-water-under-the-bridge",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2017-06-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oLWsGeuaNChQ5cNwbZNe1",
      externalLink: "https://open.spotify.com/album/3oLWsGeuaNChQ5cNwbZNe1",
    },
  ],
  title: "Water Under the Bridge",
} as const satisfies Release
