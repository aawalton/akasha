import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPtxmasDeluxeEdition = {
  id: "01a0676a-d727-7031-b934-320430c00d12",
  type: "page-type/release",
  slug: "pentatonix-ptxmas-deluxe-edition",
  title: "PTXmas (Deluxe Edition)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
