import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS08e03 = {
  id: "01a18844-d7ef-70c2-8c1f-fd2f67cb8cbf",
  type: "page-type/episode",
  slug: "criminal-minds-s08e03",
  description:
    "An UNSUB who kidnaps families with the intention of making them admit to and pay for their indiscretions.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-8"],
  position: 3,
  publishedAt: "2012-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283386",
      externalLink: "https://www.themoviedb.org/tv/4057/season/8/episode/3",
    },
  ],
  title: "Through the Looking Glass",
  episodeType: "standard",
  stillPath: "/zHDru1jBXwjHLD4uDBcKAw3E6pf.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
