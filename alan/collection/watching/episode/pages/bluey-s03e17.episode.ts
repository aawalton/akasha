import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e17 = {
  id: "01a18843-d154-73ac-9426-1059d8e7db40",
  type: "page-type/episode",
  slug: "bluey-s03e17",
  description:
    "Mum won't let Bingo have Pavlova, so the kids find a way by playing a cheeky game of Cafe in the kitchen. But Dad the chef sets up a competing shop that only serves edamame beans.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 17,
  publishedAt: "2021-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3379492",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/17",
    },
  ],
  title: "Pavlova",
  episodeType: "standard",
  stillPath: "/vk6or8Mx34Sw1vuBwyLXxATNF9q.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
