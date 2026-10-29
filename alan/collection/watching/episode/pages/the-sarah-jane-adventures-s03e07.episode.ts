import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e07 = {
  id: "01a18858-1d5d-7643-b2d8-b6b77068f412",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e07",
  description:
    "A haunted house, with mysterious whispers and secrets in the shadows - time for Sarah Jane Smith!",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 7,
  publishedAt: "2009-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12014",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/7",
    },
  ],
  title: "The Eternity Trap (1)",
  episodeType: "standard",
  stillPath: "/6TkkfYXwVdrbj24NznlcNizH8Ch.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
