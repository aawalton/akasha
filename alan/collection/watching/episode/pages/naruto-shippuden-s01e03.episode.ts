import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e03 = {
  id: "01a183d2-3bd4-7537-8773-20edce807e06",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e03",
  description:
    "Naruto’s and Sakura’s combined skills force Kakashi to use his Sharingan right off the bat. Naruto masterfully unleashes his jutsu one after another.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 3,
  publishedAt: "2007-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761473",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/3",
    },
  ],
  title: "The Results of Training",
  episodeType: "standard",
  stillPath: "/3ZhyOj5btCsLximupjKCBvNgNnd.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
