import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS07e01 = {
  id: "01a18854-50ae-7e02-b06c-89194059b7c9",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s07e01",
  description:
    "The clones look to uncover the source of the Separatists' strategies...and bring in an elite squad called the Bad Batch.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-7"],
  position: 1,
  publishedAt: "2020-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2040570",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/1",
    },
  ],
  title: "The Bad Batch",
  episodeType: "standard",
  stillPath: "/meJlPRWO2TdNGS6ExZOzldwz9mg.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
