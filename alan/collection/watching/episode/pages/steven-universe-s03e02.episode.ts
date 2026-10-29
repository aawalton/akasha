import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e02 = {
  id: "01a18855-67e9-7a86-8364-20793c28e622",
  type: "page-type/episode",
  slug: "steven-universe-s03e02",
  description: "Steven travels deep underground.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 2,
  publishedAt: "2016-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1191884",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/2",
    },
  ],
  title: "Gem Drill",
  episodeType: "standard",
  stillPath: "/5HQ0v21TGOlSjssc4jZ1XNEeEk0.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
