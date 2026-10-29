import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S05e08 = {
  id: "01a18843-5083-7106-a228-b02e64534e76",
  type: "page-type/episode",
  slug: "babylon-5-s05e08",
  description:
    "The Brakiri buy a part of Babylon 5 for a religious ceremony where the dead are supposed to return. Comedians Rebo and Zooty arrive to do a show on the station.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-wheel-of-fire"],
  position: 8,
  publishedAt: "1998-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235906",
      externalLink: "https://www.themoviedb.org/tv/3137/season/5/episode/8",
    },
  ],
  title: "Day of the Dead",
  episodeType: "standard",
  stillPath: "/1PPvRQ2ax8kzl1n8HTBKUr6nKZk.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
