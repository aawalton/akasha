import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e13 = {
  id: "01a18848-c2be-7410-94ae-0c094bbede6e",
  type: "page-type/episode",
  slug: "friends-s04e13",
  description:
    "After seeing Kathy's play, Chandler becomes convinced she is cheating on him with her co-star. Rachel develops a crush on one of her customers. Monica becomes jealous when she realizes she is no longer the 'hostess'.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 13,
  publishedAt: "1998-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86475",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/13",
    },
  ],
  title: "The One with Rachel's Crush",
  episodeType: "standard",
  stillPath: "/vIMOQQjaxNqPdmw0ro3ilrRAC4d.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
