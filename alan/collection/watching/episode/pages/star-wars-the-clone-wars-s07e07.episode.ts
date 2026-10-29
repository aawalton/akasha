import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS07e07 = {
  id: "01a18854-50ae-7243-b4ff-ba4307eaa4be",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s07e07",
  description:
    "Captured by the Pyke Syndicate, Ahsoka and the Martez sisters attempt a daring escape.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-7"],
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
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
