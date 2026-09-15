import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerHurtlessAcoustic = {
  id: "01a0676a-d720-707a-a01a-eec92e617d25",
  type: "page-type/release",
  slug: "jada-facer-hurtless-acoustic",
  title: "Hurtless (Acoustic)",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.880833,
  ownProgress: 2.880833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-04-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5s20BMWStxZhx1sMiDhcqb",
      externalLink: "https://open.spotify.com/album/5s20BMWStxZhx1sMiDhcqb",
    },
  ],
} as const satisfies Release
