import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS07e07 = {
  id: "01a18844-6113-7834-9da1-85d4be9d5cf2",
  type: "page-type/episode",
  slug: "clone-wars-s07e07",
  description:
    "Captured by the Pyke Syndicate, Ahsoka and the Martez sisters attempt a daring escape.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-7"],
  position: 7,
  publishedAt: "2020-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2201892",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/7",
    },
  ],
  title: "Dangerous Debt",
  episodeType: "standard",
  stillPath: "/vQhLPwPwTaAotAHzCd4teBbspfz.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
