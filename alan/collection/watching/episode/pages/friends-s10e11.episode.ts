import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS10e11 = {
  id: "01a18848-c2c7-74b1-bab9-ba4bc29efaac",
  type: "page-type/episode",
  slug: "friends-s10e11",
  description:
    'Joey is a celebrity contestant on "The $100,000 Pyramid," with its actual host, Donny Osmond. Meanwhile, Phoebe\'s bachelorette party features a rather unexpected surprise when the stripper shows up. Also, Chandler and Ross attend a college reunion and flash back to 1987 to reflect on a pact they made when they were in college.',
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-10"],
  position: 11,
  publishedAt: "2004-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87601",
      externalLink: "https://www.themoviedb.org/tv/1668/season/10/episode/11",
    },
  ],
  title: "The One Where the Stripper Cries",
  episodeType: "standard",
  stillPath: "/8lMKnJt9mdMAOO063pTPp8pDB4A.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
