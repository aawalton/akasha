import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e17 = {
  id: "01a18883-a8af-76c5-bbcf-d8110cb39ad4",
  type: "page-type/episode",
  slug: "criminal-minds-s01e17",
  description:
    "The BAU unit travels to NYC to investigate a series of murders that appears to have been committed by a vigilante conducting revenge on former criminals who have been released by the justice system.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 17,
  publishedAt: "2006-03-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282915",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/17",
    },
  ],
  title: "A Real Rain",
  episodeType: "standard",
  stillPath: "/4Xjt61N1dJmyoaVPoRwn2FCnHbd.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
