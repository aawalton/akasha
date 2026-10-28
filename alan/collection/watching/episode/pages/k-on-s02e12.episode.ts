import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e12 = {
  id: "01a183da-447a-7f58-a26c-81f7546fccb0",
  type: "page-type/episode",
  slug: "k-on-s02e12",
  description:
    "Summer vacation leads the girls to a summer rock festival. The girls go their separate ways and become enthralled with different aspects of the rock music experience.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 12,
  publishedAt: "2010-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879108",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/12",
    },
  ],
  title: "Summer Festival!",
  episodeType: "standard",
  stillPath: "/vvnQJgXUwyfPjiviS0iLQ8JmFk4.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
