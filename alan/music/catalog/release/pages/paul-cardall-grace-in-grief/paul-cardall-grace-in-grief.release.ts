import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallGraceInGrief = {
  id: "01a0676a-d71f-7024-ad14-8ae101b64cb5",
  type: "page-type/release",
  slug: "paul-cardall-grace-in-grief",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "055t2VuN4JyLSIcSgjVSFI",
      externalLink: "https://open.spotify.com/album/055t2VuN4JyLSIcSgjVSFI",
    },
  ],
  title: "Grace in Grief",
} as const satisfies Release
