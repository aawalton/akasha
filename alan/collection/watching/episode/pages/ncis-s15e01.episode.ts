import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e01 = {
  id: "01a1884b-ef76-76e3-a1d9-b43cb52e212a",
  type: "page-type/episode",
  slug: "ncis-s15e01",
  description:
    "The NCIS team tirelessly search for Gibbs and McGee two months after they were last seen fighting an elusive group of rebels in a Paraguay jungle.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 1,
  publishedAt: "2017-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1347497",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/1",
    },
  ],
  title: "House Divided",
  episodeType: "standard",
  stillPath: "/910LwyOMd7sfnEkMHwlVYyqGpN0.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
