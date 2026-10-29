import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e04 = {
  id: "01a1884a-e0e8-78b3-a85d-dab7b6245072",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e04",
  description:
    "The NCIS team searches Los Angeles for the lead suspect of a murdered Iraqi businessman, a former Marine who had been hired by a private security firm to protect him.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 4,
  publishedAt: "2009-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557275",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/4",
    },
  ],
  title: "Search and Destroy",
  episodeType: "standard",
  stillPath: "/a9hH1IazEinKLrKwSusktnWSi37.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
