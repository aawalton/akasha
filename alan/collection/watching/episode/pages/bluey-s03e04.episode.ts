import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e04 = {
  id: "01a18843-d153-7667-aa30-7d57713da2d0",
  type: "page-type/episode",
  slug: "bluey-s03e04",
  description:
    "Bluey keeps breaking her promises! But after seeing how much Bingo trusts Mum's word, Bluey learns the power of promises and why it's important not to break them.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 4,
  publishedAt: "2021-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3350894",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/4",
    },
  ],
  title: "Promises",
  episodeType: "standard",
  stillPath: "/uwgsPkWU43I7UeX0SvX6do1smcF.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
