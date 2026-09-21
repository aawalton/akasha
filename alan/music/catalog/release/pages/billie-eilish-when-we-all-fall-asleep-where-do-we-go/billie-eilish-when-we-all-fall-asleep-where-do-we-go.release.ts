import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGo = {
  id: "01a0676a-d730-705a-a4f2-e912dfd99513",
  type: "page-type/release",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2019-03-29",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0S0KGZnfBGSIssfF54WSJh",
      externalLink: "https://open.spotify.com/album/0S0KGZnfBGSIssfF54WSJh",
    },
  ],
  title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
} as const satisfies Release
