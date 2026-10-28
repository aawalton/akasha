import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cowboyBebopS01e10 = {
  id: "01a183d6-d2be-7ef3-8227-f65ed8800e80",
  type: "page-type/episode",
  slug: "cowboy-bebop-s01e10",
  description:
    "The Bebop Crew embarks on a wild goose chase of a bounty hunt that leads them deep into space in search of an ancient chess master.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/cowboy-bebop-season-1"],
  position: 10,
  publishedAt: "1998-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750954",
      externalLink: "https://www.themoviedb.org/tv/30991/season/1/episode/10",
    },
  ],
  title: "Bohemian Rhapsody",
  episodeType: "standard",
  stillPath: "/2l6yiD2xcyD62XNjfkMcMbI9acM.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:47:36.381Z",
  updatedAt: "2026-10-28T18:47:36.381Z",
} as const satisfies Episode
