import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaDarkSkyIslandDeluxe = {
  id: "01a0676a-d71b-7069-93f8-187cbc6b8436",
  type: "page-type/release",
  slug: "enya-dark-sky-island-deluxe",
  title: "Dark Sky Island (Deluxe)",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-11-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4FStw70Tk1spCN8V1o11oW",
      externalLink: "https://open.spotify.com/album/4FStw70Tk1spCN8V1o11oW",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
