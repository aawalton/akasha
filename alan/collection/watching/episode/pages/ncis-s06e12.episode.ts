import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e12 = {
  id: "01a1884b-ef69-7815-b97d-bc8f8ecf9639",
  type: "page-type/episode",
  slug: "ncis-s06e12",
  description:
    "The NCIS team must uncover the truth behind the murder of a jail guard which resulted in a prison riot and McGee being held captive by the inmates.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 12,
  publishedAt: "2009-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334416",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/12",
    },
  ],
  title: "Caged",
  episodeType: "standard",
  stillPath: "/ltOSGEg00JLGwAHRnygJD7TUtcp.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
