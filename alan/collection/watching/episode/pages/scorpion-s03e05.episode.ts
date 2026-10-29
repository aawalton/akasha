import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e05 = {
  id: "01a1887f-56d5-7b57-86fb-93a8baefdf4d",
  type: "page-type/episode",
  slug: "scorpion-s03e05",
  description:
    "Team Scorpion’s simple job at the Los Angeles Natural History Museum turns deadly when they discover thieves robbing a rare gem exhibit in order to get materials needed to enrich a nuclear bomb.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 5,
  publishedAt: "2016-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1222335",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/5",
    },
  ],
  title: "Plight at the Museum",
  episodeType: "standard",
  stillPath: "/kIMiEsLtPtgOnlQjmVHpUzUMtmW.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
