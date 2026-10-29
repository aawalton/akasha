import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e02 = {
  id: "01a18857-c36d-74af-8682-00519839c8ed",
  type: "page-type/episode",
  slug: "the-office-s08e02",
  description:
    "After Robert California challenges the Dunder Mifflin staffers to double their sales, Andy, taking matters into his own hands, creates an incentive program. Eventually, he promises to tattoo himself if the staff doubles their sales. Meanwhile, Pam strikes up an unlikely friendship with Angela, both of whom are pregnant.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 2,
  publishedAt: "2011-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170311",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/2",
    },
  ],
  title: "The Incentive",
  episodeType: "standard",
  stillPath: "/8z9AFNZllKXiP10LvZW0lIllJJ3.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
