import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsEyesClosed = {
  id: "01a0676a-d71d-7055-861a-b36300768c6e",
  type: "page-type/release",
  slug: "imagine-dragons-eyes-closed",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2024-04-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4p78uCfiL8gmt2AKrlWATG",
      externalLink: "https://open.spotify.com/album/4p78uCfiL8gmt2AKrlWATG",
    },
  ],
  title: "Eyes Closed",
} as const satisfies Release
