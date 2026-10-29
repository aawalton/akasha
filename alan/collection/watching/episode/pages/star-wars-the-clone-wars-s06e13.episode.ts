import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS06e13 = {
  id: "01a18854-50ae-7036-8e70-aa77f472cea7",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s06e13",
  description:
    "After many grueling trials, Yoda next travels to the ancient Sith home world of Moraband, where he must face an ancient evil determined to rule the galaxy.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-6"],
  position: 13,
  publishedAt: "2014-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010397",
      externalLink: "https://www.themoviedb.org/tv/4194/season/6/episode/13",
    },
  ],
  title: "Sacrifice",
  episodeType: "finale",
  stillPath: "/jvAA6AxDR3LtfwFPy9irBPafPjx.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
