import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e16 = {
  id: "01a18848-c2be-7da3-a5d4-35fd49c77f5c",
  type: "page-type/episode",
  slug: "friends-s04e16",
  description:
    "With two days left until Emily's departure back to England, Rachel throws a fake party for her, just so that she can see Joshua outside of work. And a pregnant (vegetarian) Phoebe craves meat.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 16,
  publishedAt: "1998-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87731",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/16",
    },
  ],
  title: "The One with the Fake Party",
  episodeType: "standard",
  stillPath: "/sjFybiEckDorc9beXc8cHxNeAHg.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
