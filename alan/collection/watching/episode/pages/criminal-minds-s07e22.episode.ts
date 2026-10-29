import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS07e22 = {
  id: "01a18844-d7ef-72f4-a842-8c9c9ee4c13b",
  type: "page-type/episode",
  slug: "criminal-minds-s07e22",
  description:
    "Rossi and the team teach college students the science of criminal profiling by taking the class through a serial-killer case that spanned 20 years.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-7"],
  position: 22,
  publishedAt: "2012-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283374",
      externalLink: "https://www.themoviedb.org/tv/4057/season/7/episode/22",
    },
  ],
  title: "Profiling 101",
  episodeType: "standard",
  stillPath: "/od9YMWbgtkDYx4olS3GAh0RjiwU.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
