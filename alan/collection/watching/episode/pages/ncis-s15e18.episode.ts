import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e18 = {
  id: "01a1884b-ef77-7e53-b53c-920dd23a2145",
  type: "page-type/episode",
  slug: "ncis-s15e18",
  description:
    "The NCIS headquarters are evacuated after the team discovers a body as well as bomb materials on the roof of the squad room.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 18,
  publishedAt: "2018-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1434721",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/18",
    },
  ],
  title: "Death from Above",
  episodeType: "standard",
  stillPath: "/uENMgscW87NejwZ9xMk9eUseCNJ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
