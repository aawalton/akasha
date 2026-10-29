import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e10 = {
  id: "01a18843-d154-77a5-b55a-ad16a747054c",
  type: "page-type/episode",
  slug: "bluey-s03e10",
  description:
    "Bluey teaches Bingo how to use magic so she can make Mum play with her, but she forgets to explain the most important rule - never use magic for cheekiness!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 10,
  publishedAt: "2021-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3359686",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/10",
    },
  ],
  title: "Magic",
  episodeType: "standard",
  stillPath: "/d7A6JUZ8stC0ROzEwcPkH7vSzJU.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
