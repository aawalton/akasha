import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdEggInTheBackseat = {
  id: "01a0676a-d71c-7060-8732-bfbaad3e437b",
  type: "page-type/release",
  slug: "em-beihold-egg-in-the-backseat",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2022-07-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1iHhuUxL99xxbDjlLwHV8W",
      externalLink: "https://open.spotify.com/album/1iHhuUxL99xxbDjlLwHV8W",
    },
  ],
  title: "Egg in the Backseat",
} as const satisfies Release
