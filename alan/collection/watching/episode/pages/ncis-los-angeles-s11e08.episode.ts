import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e08 = {
  id: "01a1884a-e0f4-77ca-8f53-4698feb2c12b",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e08",
  description:
    "After a Navy lieutenant disappears from the scene of a car accident, the NCIS team processes the crime scene and discovers his laptop is missing along with recently accessed confidential information for retired Navy SEALs.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 8,
  publishedAt: "2019-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1986911",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/8",
    },
  ],
  title: "Human Resources",
  episodeType: "standard",
  stillPath: "/a1XawLQl1BMCpGYGkq5AWfKHA94.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
