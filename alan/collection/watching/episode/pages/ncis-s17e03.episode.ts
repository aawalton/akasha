import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e03 = {
  id: "01a1884b-ef79-7bdf-982c-28b003419ea7",
  type: "page-type/episode",
  slug: "ncis-s17e03",
  description:
    "After the body of a Marine Lieutenant is found hidden under an 18-wheeler, the NCIS team tracks the vehicle’s previous locations to pinpoint the crime scene and suspect.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 3,
  publishedAt: "2019-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1933358",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/3",
    },
  ],
  title: "Going Mobile",
  episodeType: "standard",
  stillPath: "/A9DIjmfR5KTYlNXa43TcIJ2HpmX.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
