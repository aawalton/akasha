import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e07 = {
  id: "01a18848-3730-7386-95f2-fd462e19e52e",
  type: "page-type/episode",
  slug: "eureka-s01e07",
  description:
    "Carter investigates an unusual car accident. Meanwhile, Stark, under the stress of completing a project on time, pressures two research teams to produce results. ",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 7,
  publishedAt: "2006-08-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335234",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/7",
    },
  ],
  title: "Blink",
  episodeType: "standard",
  stillPath: "/vuPm3PIuRX3Ouuxv4jNAg5fLmsQ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
