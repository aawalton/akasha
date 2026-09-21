import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxStardust = {
  id: "01a0676a-d72a-7011-84de-698e7d4d2ce9",
  type: "page-type/release",
  slug: "lilith-max-stardust",
  title: "Stardust",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 3.414833,
  ownProgress: 3.414833,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2021-07-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70HWnquH6Quz4BEPpxgubY",
      externalLink: "https://open.spotify.com/album/70HWnquH6Quz4BEPpxgubY",
    },
  ],
} as const satisfies Release
