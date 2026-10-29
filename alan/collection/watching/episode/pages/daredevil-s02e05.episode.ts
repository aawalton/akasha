import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e05 = {
  id: "01a18845-e1fa-7ebc-9868-74944c6cece7",
  type: "page-type/episode",
  slug: "daredevil-s02e05",
  description: "The Anti-Vigilante Task Force intensifies its search for Daredevil and Bullseye.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 5,
  publishedAt: "2026-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6825661",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/5",
    },
  ],
  title: "The Grand Design",
  episodeType: "standard",
  stillPath: "/3Pw0G3sjFcd0qgtYqkvtIvTHxGQ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
