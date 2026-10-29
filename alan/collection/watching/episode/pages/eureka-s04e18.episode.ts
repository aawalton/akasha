import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e18 = {
  id: "01a18848-3734-7e95-8e36-27674f40445d",
  type: "page-type/episode",
  slug: "eureka-s04e18",
  description:
    "The Astraeus candidates go through their final interviews while Carter and Allison appeal their relationship audit.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 18,
  publishedAt: "2011-08-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335288",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/18",
    },
  ],
  title: "This One Time at Space Camp...",
  episodeType: "standard",
  stillPath: "/2k44Y3cTKc3ELvXsG3vfTeMIqke.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
