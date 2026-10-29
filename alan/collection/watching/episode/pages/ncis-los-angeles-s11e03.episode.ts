import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e03 = {
  id: "01a1884a-e0f4-792a-bb4a-ba19412650dd",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e03",
  description:
    "Callen and Sam run protection detail for retired Navy Admiral Kilbride in an operation to locate a missing Naval intelligence officer.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 3,
  publishedAt: "2019-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1935140",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/3",
    },
  ],
  title: "Hail Mary",
  episodeType: "standard",
  stillPath: "/khWPJcsNRH05b0YM7HV6pHFIwO.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
