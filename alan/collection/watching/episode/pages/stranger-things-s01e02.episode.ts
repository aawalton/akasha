import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e02 = {
  id: "01a18855-9112-7f56-b5f3-79fae02cdd1f",
  type: "page-type/episode",
  slug: "stranger-things-s01e02",
  description:
    "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 2,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1203677",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/2",
    },
  ],
  title: "Chapter Two: The Weirdo on Maple Street",
  episodeType: "standard",
  stillPath: "/8iA56ugQyHZmX81wSsNqwXjCE6F.jpg",
  voteAverage: 8.227,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
