import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS05e03 = {
  id: "01a183d7-7ce6-7c1c-8725-8b23b535b725",
  type: "page-type/episode",
  slug: "hetalia-s05e03",
  description:
    "Iceland feels like there's something a bit off about today's Nordic meeting. Meanwhile, Estonia wants to join the Nordics.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-5"],
  position: 3,
  publishedAt: "2015-07-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826987",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5/episode/3",
    },
  ],
  title: "Meeting of the Nordic",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
