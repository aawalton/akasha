import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e23 = {
  id: "01a1884b-ef63-7711-b326-dfc9ce42286a",
  type: "page-type/episode",
  slug: "ncis-s01e23",
  description:
    "The terrorist from Bête Noire returns with a plan to attack the President. Gibbs and his team follow the clues to reveal his identity and find Kate who is kidnapped.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 23,
  publishedAt: "2004-05-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334452",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/23",
    },
  ],
  title: "Reveille",
  episodeType: "finale",
  stillPath: "/jCkNJV9B1BWHWbYQ34u2ao6I1sZ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
