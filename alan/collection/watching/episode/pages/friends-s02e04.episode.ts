import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e04 = {
  id: "01a18848-c2ba-78a8-89df-e0fb381db6c1",
  type: "page-type/episode",
  slug: "friends-s02e04",
  description:
    "The gang is amazed to learn that Phoebe married a gay Canadian ice dancer to help him get his green card. And Ross seeks relationship advice from Rachel.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 4,
  publishedAt: "1995-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86233",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/4",
    },
  ],
  title: "The One with Phoebe's Husband",
  episodeType: "standard",
  stillPath: "/4TtMxp6Yo8zjMsVzfedzskJQx8d.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
