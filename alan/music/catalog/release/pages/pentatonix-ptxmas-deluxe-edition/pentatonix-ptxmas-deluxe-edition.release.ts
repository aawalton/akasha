import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPtxmasDeluxeEdition = {
  id: "01a0676a-d727-7031-b934-320430c00d12",
  type: "page-type/release",
  slug: "pentatonix-ptxmas-deluxe-edition",
  title: "PTXmas (Deluxe Edition)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 28.3961,
  ownProgress: 28.3961,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-11-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ZwH7KH8Zw0m76hYwANMos",
      externalLink: "https://open.spotify.com/album/5ZwH7KH8Zw0m76hYwANMos",
    },
  ],
} as const satisfies Release
