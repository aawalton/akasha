import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishNoTimeToDie = {
  id: "01a0676a-d725-706c-aebd-6e5edbc85996",
  type: "page-type/release",
  slug: "billie-eilish-no-time-to-die",
  title: "No Time To Die",
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  ownLength: 4.03775,
  ownProgress: 4.03775,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2020-02-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sXSHscDjBez8VF20cSyad",
      externalLink: "https://open.spotify.com/album/5sXSHscDjBez8VF20cSyad",
    },
  ],
} as const satisfies Release
