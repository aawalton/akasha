import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const numb3rsS01e01 = {
  id: "01a1887f-0b94-7cd2-9852-1adcec31f9f6",
  type: "page-type/episode",
  slug: "numb3rs-s01e01",
  description:
    "To help capture a serial rapist-turned-killer, FBI Special Agent Don Eppes recruits his genius brother Charlie, who uses a mathematical equation to identify the killer's point of origin by working back from the crime scene locations.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/numb3rs-season-1"],
  position: 1,
  publishedAt: "2005-01-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "33386",
      externalLink: "https://www.themoviedb.org/tv/578/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/d7KROIXntIGt3VSGwddmzIpRZqj.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:29:49.843Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Episode
