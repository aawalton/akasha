import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallGracieSThemeLive = {
  id: "01a0676a-d71f-7025-8ac9-e8277e3caa66",
  type: "page-type/release",
  slug: "paul-cardall-gracie-s-theme-live",
  title: "Gracie's Theme (Live)",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 5.018233,
  ownProgress: 5.018233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-05-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23pcrIQJF11ZdqSVVVBMuv",
      externalLink: "https://open.spotify.com/album/23pcrIQJF11ZdqSVVVBMuv",
    },
  ],
} as const satisfies Release
