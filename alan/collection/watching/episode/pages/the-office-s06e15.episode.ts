import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e15 = {
  id: "01a18857-c36b-741f-a310-9b32e93254b5",
  type: "page-type/episode",
  slug: "the-office-s06e15",
  description:
    "Sabre's CEO wants the Scranton branch to have one manager, and Michael voluntarily steps down and lets Jim become the boss when he finds out that salespeople make more money. However, he soon comes to regret the decision.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 15,
  publishedAt: "2010-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170204",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/15",
    },
  ],
  title: "The Manager and the Salesman",
  episodeType: "standard",
  stillPath: "/rUeCQBiSKMiaEvB8fnoRDl8rtb4.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
