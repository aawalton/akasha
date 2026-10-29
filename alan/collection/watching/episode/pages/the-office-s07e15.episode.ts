import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e15 = {
  id: "01a18857-c36d-7793-90a8-a7fccd8516e6",
  type: "page-type/episode",
  slug: "the-office-s07e15",
  description:
    "The staff grows increasingly uncomfortable with Michael and Holly's PDAs. Jim and Pam regret a champagne luncheon. Andy horns in on a romantic treasure hunt Gabe arranged for Erin.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 15,
  publishedAt: "2011-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170279",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/15",
    },
  ],
  title: "PDA",
  episodeType: "standard",
  stillPath: "/vqSiR9RXYxUnTZpzwJxLeY5QNcy.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
