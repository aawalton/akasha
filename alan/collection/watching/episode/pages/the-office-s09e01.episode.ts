import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e01 = {
  id: "01a18857-c36e-787e-90f5-e6185edadf06",
  type: "page-type/episode",
  slug: "the-office-s09e01",
  description:
    "Two new, young employees throw Dwight and Jim off balance; Andy returns from leadership training with a desire for revenge.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 1,
  publishedAt: "2012-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170315",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/1",
    },
  ],
  title: "New Guys",
  episodeType: "standard",
  stillPath: "/9XUFWn9fvuA1oo3DdAfb3A4ZEIo.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
