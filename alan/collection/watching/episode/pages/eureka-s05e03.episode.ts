import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e03 = {
  id: "01a18848-3734-75b8-9b1d-f74fc6a3f1bd",
  type: "page-type/episode",
  slug: "eureka-s05e03",
  description:
    "Beverly Barlowe resurfaces in Eureka seeking Carter's help to free the Astraeus crew, and the rescue plan lands Carter in the crew's virtual world. ",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 3,
  publishedAt: "2012-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335296",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/3",
    },
  ],
  title: "Force Quit",
  episodeType: "standard",
  stillPath: "/bmLhasRHTGo5OCCf8J5ZFcbWeXN.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
