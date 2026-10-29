import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e10 = {
  id: "01a18852-d431-7b50-9c25-edad84f8932e",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e10",
  description:
    "Hoshi experiences her first transporter experience and strange aftereffects lead her to believe she wasn't reassembled correctly.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 10,
  publishedAt: "2002-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15568",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/10",
    },
  ],
  title: "Vanishing Point",
  episodeType: "standard",
  stillPath: "/qtnlXZVWyvkMjWD6BaYqtRT3v9M.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
