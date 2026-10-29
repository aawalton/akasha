import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e21 = {
  id: "01a18848-3734-7b61-8d28-3d33dab23c0f",
  type: "page-type/episode",
  slug: "eureka-s04e21",
  description:
    "The quaint town of geniuses is transformed into animated versions of themselves. Sheriff Carter and Allison Blake are secretly planning the perfect holiday surprise for their kids. But a mysterious kaleidoscopic wave of color crashes over Eureka, leaving the entire town and its inhabitants animated.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 21,
  publishedAt: "2011-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335291",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/21",
    },
  ],
  title: "Do You See What I See",
  episodeType: "finale",
  stillPath: "/a8rPoySlkSabDgjCZndV4YaG7k3.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
