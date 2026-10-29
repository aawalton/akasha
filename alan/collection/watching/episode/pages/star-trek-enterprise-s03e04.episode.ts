import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e04 = {
  id: "01a18852-d432-74a7-9032-41a9a450122c",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e04",
  description:
    "The NX-01 gets closer to a showdown with the Xindi when Captain Archer takes on an enigmatic passenger: a beautiful slave named Rajiin.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 4,
  publishedAt: "2003-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15601",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/4",
    },
  ],
  title: "Rajiin",
  episodeType: "standard",
  stillPath: "/vHt6PmutODfASlHr1qlnmChhMz2.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
