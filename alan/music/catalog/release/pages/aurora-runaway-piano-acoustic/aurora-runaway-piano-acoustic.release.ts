import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunawayPianoAcoustic = {
  id: "01a0676a-d728-702f-a748-ed81b96199cb",
  type: "page-type/release",
  slug: "aurora-runaway-piano-acoustic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-03-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08NTVF7UdKI2aCxgaOTY84",
      externalLink: "https://open.spotify.com/album/08NTVF7UdKI2aCxgaOTY84",
    },
  ],
  title: "Runaway (Piano Acoustic)",
} as const satisfies Release
