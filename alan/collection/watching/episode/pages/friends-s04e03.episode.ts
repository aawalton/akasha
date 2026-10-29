import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e03 = {
  id: "01a18848-c2bd-7925-90d3-4752ee142970",
  type: "page-type/episode",
  slug: "friends-s04e03",
  description:
    "Monica caters a party for her mother, who still doesn't quite know how to talk to her daughter. Chandler's encounter with Rachel's boss leads to an embarrassing situation. And an encyclopedia salesman takes advantage of Joey.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 3,
  publishedAt: "1997-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86385",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/3",
    },
  ],
  title: "The One with the 'Cuffs",
  episodeType: "standard",
  stillPath: "/fqXZu4P3QTa27Ne2fzkZM5sdbpG.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
