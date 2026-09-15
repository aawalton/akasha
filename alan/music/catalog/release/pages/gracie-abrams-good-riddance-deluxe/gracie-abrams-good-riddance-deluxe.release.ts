import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsGoodRiddanceDeluxe = {
  id: "01a0676a-d71f-701d-a466-ee841e6ada06",
  type: "release",
  slug: "gracie-abrams-good-riddance-deluxe",
  title: "Good Riddance (Deluxe)",
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  ownLength: 68.0943,
  ownProgress: 68.0943,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-06-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78YYcghEDz2dHRx0EcDGXZ",
      externalLink: "https://open.spotify.com/album/78YYcghEDz2dHRx0EcDGXZ",
    },
  ],
} as const satisfies Release
