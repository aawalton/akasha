import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS04e03 = {
  id: "01a18856-4001-7345-ab20-dc8cbbf4fed9",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s04e03",
  description:
    "The guys are concerned as Sheldon searches for an alternative to human companionship.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-4"],
  position: 3,
  publishedAt: "2010-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64699",
      externalLink: "https://www.themoviedb.org/tv/1418/season/4/episode/3",
    },
  ],
  title: "The Zazzy Substitution",
  episodeType: "standard",
  stillPath: "/eBLxhs3TDM8d0zlutOGhIfDDVd2.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
