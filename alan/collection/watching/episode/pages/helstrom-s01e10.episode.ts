import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const helstromS01e10 = {
  id: "01a18849-6db8-7775-b0fd-acd4befc0b7d",
  type: "page-type/episode",
  slug: "helstrom-s01e10",
  description:
    "Ana and Daimon fight to save a soul but only Yen can be victorious. Gabriella’s newfound perspective challenges Daimon’s beliefs, creating riffs amongst the group. Victoria unites with Daimon and Ana, but their victory comes at a cost.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/helstrom-season-1"],
  position: 10,
  publishedAt: "2020-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2381476",
      externalLink: "https://www.themoviedb.org/tv/88987/season/1/episode/10",
    },
  ],
  title: "Hell Storm",
  episodeType: "finale",
  stillPath: "/qx8mP3jX3kROOqzhXBZMDnUiX3b.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:31:16.024Z",
  updatedAt: "2026-10-29T15:31:16.024Z",
} as const satisfies Episode
