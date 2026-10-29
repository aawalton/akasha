import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e24 = {
  id: "01a1884b-ef70-704c-83a7-eaeadbe96d1f",
  type: "page-type/episode",
  slug: "ncis-s10e24",
  description:
    "The international manhunt for Eli David's killer turns into a federal witch hunt against Gibbs and the team, which questions their unconventional methods and threatens their future at the agency.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 24,
  publishedAt: "2013-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334694",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/24",
    },
  ],
  title: "Damned If You Do",
  episodeType: "finale",
  stillPath: "/8GtMVVeyVO8ZjCKZYfSc31AmYhM.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
