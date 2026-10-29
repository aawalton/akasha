import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e05 = {
  id: "01a18851-3df5-7147-9186-c9246d143b15",
  type: "page-type/episode",
  slug: "person-of-interest-s03e05",
  description:
    "Shaw must stay close to a 10-year-old girl with highly developed surveillance skills when she is identified by the machine; Carter's mission could be exposed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 5,
  publishedAt: "2013-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970556",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/5",
    },
  ],
  title: "Razgovor",
  episodeType: "standard",
  stillPath: "/hfuZIJ1zUS0mZCRyD5rcO3Sv3p.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
