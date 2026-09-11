import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const pentatonixSweet = {
  id: "01a0676a-d72a-704c-85d9-53ca41713109",
  type: "release",
  slug: "pentatonix-sweet",
  title: "Sweet",
  partOfCollections: ["pentatonix"],
  position: 0,
  ownLength: 2.6373,
  ownProgress: 2.6373,
  unit: "minutes",
  status: "completed",
  publishedAt: "2022-07-22",
  externalId: "47UYmpTcR2FzI3lWJagsoL",
  externalLink: "https://open.spotify.com/album/47UYmpTcR2FzI3lWJagsoL",
} as const satisfies Release
