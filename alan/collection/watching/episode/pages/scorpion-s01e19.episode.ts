import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS01e19 = {
  id: "01a1887f-56d2-7bf3-aea9-4e00b7285ca4",
  type: "page-type/episode",
  slug: "scorpion-s01e19",
  description:
    "While on a mission to save lost hikers, Team Scorpion’s helicopter crashes, igniting a massive wildfire that quickly closes in on them. Also, Sylvester must help their injured pilot who is unable to make it to safer ground.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/scorpion-season-1"],
  position: 19,
  publishedAt: "2015-03-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1046060",
      externalLink: "https://www.themoviedb.org/tv/60797/season/1/episode/19",
    },
  ],
  title: "Young Hearts Spark Fire",
  episodeType: "standard",
  stillPath: "/6F9nVg5ULnqJ2ikoY409kQUXxYR.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
