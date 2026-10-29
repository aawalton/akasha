import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e21 = {
  id: "01a1884a-e0f3-718a-bd82-361924e53c55",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e21",
  description:
    "After Anna Kolcheck escapes from prison with her cellmate, Callen and the NCIS team assist with the investigation and search for her whereabouts.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 21,
  publishedAt: "2019-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773921",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/21",
    },
  ],
  title: "The One That Got Away",
  episodeType: "standard",
  stillPath: "/hJnLbbvDR0l5CusC9cltqR08Uwa.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
