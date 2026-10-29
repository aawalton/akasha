import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const severanceS01e04 = {
  id: "01a1887f-8746-7f64-93a1-2660dd665ed2",
  type: "page-type/episode",
  slug: "severance-s01e04",
  description:
    "Irving finds an intriguing book at work. Helly aggressively pursues a meeting with her Outie. Mark attends a funeral with Ms. Selvig.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/severance-season-1"],
  position: 4,
  publishedAt: "2022-03-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3396431",
      externalLink: "https://www.themoviedb.org/tv/95396/season/1/episode/4",
    },
  ],
  title: "The You You Are",
  episodeType: "standard",
  stillPath: "/dzQJeDznS0I4spAqTImiLH9p252.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:30:21.510Z",
  updatedAt: "2026-10-29T16:30:21.510Z",
} as const satisfies Episode
