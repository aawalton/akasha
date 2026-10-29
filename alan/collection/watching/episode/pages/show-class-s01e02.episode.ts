import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS01e02 = {
  id: "01a18851-e164-7824-b9ff-5c91aef96ef8",
  type: "page-type/episode",
  slug: "show-class-s01e02",
  description:
    "Zoe learns that Grace has a serious illness. Miles gets in trouble for venting about his mother’s new man, which leads him to express his anger towards restrictions in free speech.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/class-season-1"],
  position: 2,
  publishedAt: "2016-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1155091",
      externalLink: "https://www.themoviedb.org/tv/65152/season/1/episode/2",
    },
  ],
  title: "#NoFilter",
  episodeType: "standard",
  stillPath: "/8yWew0p6BKca3mHsrJfmaGpW7dH.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
