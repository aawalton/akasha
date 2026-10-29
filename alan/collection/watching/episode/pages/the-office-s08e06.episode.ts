import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e06 = {
  id: "01a18857-c36d-707a-86dc-57769b357370",
  type: "page-type/episode",
  slug: "the-office-s08e06",
  description:
    "Dwight installs a Doomsday device that will fire all of the employees and effectively close down the branch if they make too many mistakes. Meanwhile, Gabe attempts to court the new warehouse worker, Val.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 6,
  publishedAt: "2011-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170295",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/6",
    },
  ],
  title: "Doomsday",
  episodeType: "standard",
  stillPath: "/ub0InCZ9c9obEfHSsFl8HPKOcg5.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
