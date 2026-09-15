import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2AlmostInLove = {
  id: "01a0676a-d716-702d-ae3e-92823b29bdd7",
  type: "release",
  slug: "elvis-presley-2-almost-in-love",
  title: "Almost in Love",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 32.083067,
  ownProgress: 32.083067,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1970-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "37RnDHLg68pu4owUWJYmMt",
      externalLink: "https://open.spotify.com/album/37RnDHLg68pu4owUWJYmMt",
    },
  ],
} as const satisfies Release
