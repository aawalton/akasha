import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraCureForMeAcoustic = {
  id: "01a0676a-d71b-7045-be35-df9a6397005e",
  type: "page-type/release",
  slug: "aurora-cure-for-me-acoustic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-08-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4W1FK6QtI8cY7j9aghTmbw",
      externalLink: "https://open.spotify.com/album/4W1FK6QtI8cY7j9aghTmbw",
    },
  ],
  title: "Cure for Me (Acoustic)",
} as const satisfies Release
