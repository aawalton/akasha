import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e05 = {
  id: "01a18855-67eb-77f9-b85d-48f8da7d665c",
  type: "page-type/episode",
  slug: "steven-universe-s05e05",
  description: "Steven helps Mayor Dewey run a difficult campaign.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 5,
  publishedAt: "2017-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1391178",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/5",
    },
  ],
  title: "Dewey Wins",
  episodeType: "standard",
  stillPath: "/wrXEsHchC6xFg7K07s8KgHVw2h6.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
