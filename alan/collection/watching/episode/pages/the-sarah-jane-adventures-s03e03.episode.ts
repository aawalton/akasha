import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e03 = {
  id: "01a18858-1d5d-744f-9987-239ab395f04b",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e03",
  description:
    "Far in the future, in the year 2059, Old Rani remembers the day when her whole life went wrong.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 3,
  publishedAt: "2009-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12011",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/3",
    },
  ],
  title: "The Mad Woman in the Attic (1)",
  episodeType: "standard",
  stillPath: "/c2R12o0ofh0A06wnGjAkboSy9GZ.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
