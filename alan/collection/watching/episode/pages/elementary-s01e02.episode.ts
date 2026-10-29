import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e02 = {
  id: "01a1887e-62a5-7a1c-ba42-44e714cd91ab",
  type: "page-type/episode",
  slug: "elementary-s01e02",
  description:
    "Sherlock uses his powers of deduction to consult on the murder of a young man who is shot upon entering his apartment. Meanwhile, Watson has dinner with her ex-boyfriend, Ty Morstan.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 2,
  publishedAt: "2012-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64287",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/2",
    },
  ],
  title: "While You Were Sleeping",
  episodeType: "standard",
  stillPath: "/emORiIHbzChPTk6nmrNdzssW3DF.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
