import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e06 = {
  id: "01a1884b-ef73-7585-86f2-75ddccb0bcd8",
  type: "page-type/episode",
  slug: "ncis-s13e06",
  description:
    "When a Petty Officer’s murder matches the M.O. of a local serial killer, the NCIS team must determine if this is the killer’s latest victim or the work of a copycat.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 6,
  publishedAt: "2015-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132708",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/6",
    },
  ],
  title: "Viral",
  episodeType: "standard",
  stillPath: "/zN3qdZ6nGeVPCxvoJ92IbAWp8Cf.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
