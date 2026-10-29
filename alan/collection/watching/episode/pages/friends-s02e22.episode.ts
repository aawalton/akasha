import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e22 = {
  id: "01a18848-c2bb-77a6-8606-8629b47a4b1d",
  type: "page-type/episode",
  slug: "friends-s02e22",
  description:
    "Monica decides to hold a surprise birthday for Rachel, but everything goes wrong when Rachel's estranged parents turn up unexpectedly. The party then splits into two factions, but complications inevitably ensue.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 22,
  publishedAt: "1996-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86212",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/22",
    },
  ],
  title: "The One with the Two Parties",
  episodeType: "standard",
  stillPath: "/74LSOxfvUVYODuoof2Y3OJbGxs4.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
