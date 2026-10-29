import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e13 = {
  id: "01a18857-c369-7b7b-a912-cc6e296d0f0e",
  type: "page-type/episode",
  slug: "the-office-s04e13",
  description:
    "Jim is wearing his best golfing uniform because he is hitting the links with a potential client, Phil Maguire. This is a very important account for Jim because he needs to look good to Ryan, who recently put him on probation for his job performance. Andy and Kevin are also joining in the game to show their support.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 13,
  publishedAt: "2008-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170236",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/13",
    },
  ],
  title: "Job Fair",
  episodeType: "standard",
  stillPath: "/5X4HKfoyzIYME6RYoiB3TJZtP4z.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
