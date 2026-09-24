import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdMaybeLifeIsGood = {
  id: "01a0676a-d724-703e-82e8-e5e7e58289b2",
  type: "page-type/release",
  slug: "em-beihold-maybe-life-is-good",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2024-02-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JrelA49G1d8BdKIaJ64YO",
      externalLink: "https://open.spotify.com/album/3JrelA49G1d8BdKIaJ64YO",
    },
  ],
  title: "Maybe Life Is Good",
} as const satisfies Release
