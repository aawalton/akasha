import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishNoTimeToDie = {
  id: "01a0676a-d725-706c-aebd-6e5edbc85996",
  type: "page-type/release",
  slug: "billie-eilish-no-time-to-die",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2020-02-13",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sXSHscDjBez8VF20cSyad",
      externalLink: "https://open.spotify.com/album/5sXSHscDjBez8VF20cSyad",
    },
  ],
  title: "No Time To Die",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
