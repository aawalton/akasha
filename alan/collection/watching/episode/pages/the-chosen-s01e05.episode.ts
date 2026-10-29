import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS01e05 = {
  id: "01a18856-9869-7ba2-ae40-cedd0e5b0522",
  type: "page-type/episode",
  slug: "the-chosen-s01e05",
  description:
    "Nicodemus interrogates John the Baptizer while Jesus and his students make their way to a wedding celebration in Cana. When the wine runs low, Mary asks her son to intervene on behalf of the bridegroom's family.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-1"],
  position: 5,
  publishedAt: "2019-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1988461",
      externalLink: "https://www.themoviedb.org/tv/85077/season/1/episode/5",
    },
  ],
  title: "The Wedding Gift",
  episodeType: "standard",
  stillPath: "/xxLuinhtXhvYKriS5F4KGbmj5TF.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
