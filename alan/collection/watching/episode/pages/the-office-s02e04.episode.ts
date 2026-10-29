import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e04 = {
  id: "01a18857-c366-7c36-8ef9-2f51f7946e9b",
  type: "page-type/episode",
  slug: "the-office-s02e04",
  description:
    'The Office is forced into the parking lot for the day when a fire starts in the kitchen. To ease everyone\'s boredom, Jim suggests a game of "Desert Island" and "Who Would You Do?", where certain staff members reveal a little too much information about themselves. Throughout the day, Michael talks business with Ryan, leaving Dwight feeling left out.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 4,
  publishedAt: "2005-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170137",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/4",
    },
  ],
  title: "The Fire",
  episodeType: "standard",
  stillPath: "/7lJIxk2icns4fvF9BZxVqouTmC5.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
