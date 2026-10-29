import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS03e04 = {
  id: "01a18885-4804-7cfa-a404-2e5ce45aa554",
  type: "page-type/episode",
  slug: "the-rookie-s03e04",
  description:
    "Officer Jackson West’s relationship with his new training officer, Stanton, has escalated and he begins to work with Sergeant Grey to find a solution.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-3"],
  position: 4,
  publishedAt: "2021-01-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2614181",
      externalLink: "https://www.themoviedb.org/tv/79744/season/3/episode/4",
    },
  ],
  title: "Sabotage",
  episodeType: "standard",
  stillPath: "/tWHHB2ZeBkWcE4VpcHgWcRs6aMc.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
