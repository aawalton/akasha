import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e16 = {
  id: "01a18844-d7f3-7796-8390-9b857baf98d1",
  type: "page-type/episode",
  slug: "criminal-minds-s10e16",
  description:
    "When two guards at a privatized maximum security prison in Texas are murdered, the BAU suspects that more than one UnSub within the prison could be at work.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 16,
  publishedAt: "2015-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041805",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/16",
    },
  ],
  title: "Lockdown",
  episodeType: "standard",
  stillPath: "/t9Rk0NE3mSLZ4wMkACD3Yq6RjDD.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
