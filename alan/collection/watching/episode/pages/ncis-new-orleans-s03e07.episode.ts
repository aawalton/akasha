import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e07 = {
  id: "01a1884b-3018-7d1c-a3df-e9687960d56d",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e07",
  description:
    "The NCIS team investigates the murder of a sailor during a rowdy motorcycle rally in the city. Lasalle turns to Gregorio for advice on his personal life.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 7,
  publishedAt: "2016-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1239981",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/7",
    },
  ],
  title: "Outlaws",
  episodeType: "standard",
  stillPath: "/AttXC4RJIllp56rzHXllXYcF1Z8.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
