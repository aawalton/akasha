import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2AmidTheFallingSnow = {
  id: "01a0676a-d717-700c-8502-3238e90b7a84",
  type: "page-type/release",
  slug: "celtic-woman-2-amid-the-falling-snow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2019-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7yWN3AxJLtzSl9unzlCekl",
      externalLink: "https://open.spotify.com/album/7yWN3AxJLtzSl9unzlCekl",
    },
  ],
  title: "Amid The Falling Snow",
} as const satisfies Release
