import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS07e03 = {
  id: "01a18848-c2c2-70a5-8187-21902f1a597a",
  type: "page-type/episode",
  slug: "friends-s07e03",
  description:
    "Monica tries to figure out Phoebe's grandmother's secret chocolate chip cookie recipe. Meanwhile, Rachel tries to teach Joey how to sail, and Chandler has an awkward encounter when he tries to bond with Monica's father.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-7"],
  position: 3,
  publishedAt: "2000-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87010",
      externalLink: "https://www.themoviedb.org/tv/1668/season/7/episode/3",
    },
  ],
  title: "The One with Phoebe's Cookies",
  episodeType: "standard",
  stillPath: "/s2jCzF7wnHJMs0gLrJzgPEbd1Zd.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
