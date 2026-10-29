import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e05 = {
  id: "01a1884b-3018-7f3d-a40d-37688545d29c",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e05",
  description:
    "The team join forces with the FBI to investigate a plane crash in the bayou that left three sailors dead. Sonja and Lasalle interview candidates for the open agent position.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 5,
  publishedAt: "2016-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1234099",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/5",
    },
  ],
  title: "Course Correction",
  episodeType: "standard",
  stillPath: "/kH9EdAtqylOBGu751ToDgQNU7Rr.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
