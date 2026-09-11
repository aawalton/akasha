import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const pentatonixPtx = {
  id: "01a0676a-d727-702b-b843-5562e9a19f99",
  type: "release",
  slug: "pentatonix-ptx",
  title: "PTX",
  partOfCollections: ["pentatonix"],
  position: 0,
  ownLength: 60.632783,
  ownProgress: 60.632783,
  unit: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2014-09-19",
  externalId: "77RBn8pRsfXlZdfTQh221D",
  externalLink: "https://open.spotify.com/album/77RBn8pRsfXlZdfTQh221D",
} as const satisfies Release
