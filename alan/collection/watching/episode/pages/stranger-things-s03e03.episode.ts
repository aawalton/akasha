import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS03e03 = {
  id: "01a18855-9112-7441-9206-371329207cf8",
  type: "page-type/episode",
  slug: "stranger-things-s03e03",
  description:
    "With El and Max looking for Billy, Will declares a day without girls. Steve and Dustin go on a stakeout, and Joyce and Hopper return to Hawkins Lab.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-3"],
  position: 3,
  publishedAt: "2019-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1657330",
      externalLink: "https://www.themoviedb.org/tv/66732/season/3/episode/3",
    },
  ],
  title: "Chapter Three: The Case of the Missing Lifeguard",
  episodeType: "standard",
  stillPath: "/oaYdVvYwnvoQ7SLelKUcaAt0HKJ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
