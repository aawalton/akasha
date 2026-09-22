import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxStardust = {
  id: "01a0676a-d72a-7011-84de-698e7d4d2ce9",
  type: "page-type/release",
  slug: "lilith-max-stardust",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2021-07-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70HWnquH6Quz4BEPpxgubY",
      externalLink: "https://open.spotify.com/album/70HWnquH6Quz4BEPpxgubY",
    },
  ],
  title: "Stardust",
} as const satisfies Release
