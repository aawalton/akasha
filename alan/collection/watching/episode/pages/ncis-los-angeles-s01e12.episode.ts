import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e12 = {
  id: "01a1884a-e0e8-78c5-a2e7-71661adf4989",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e12",
  description:
    "The murder of a recently released convict forces Callen to go undercover solo as an old alias, while Sam and the LA team track him from a distance.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 12,
  publishedAt: "2010-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557288",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/12",
    },
  ],
  title: "Past Lives",
  episodeType: "standard",
  stillPath: "/4tJxgtoBRKsmIFuwSYctaojYciO.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
