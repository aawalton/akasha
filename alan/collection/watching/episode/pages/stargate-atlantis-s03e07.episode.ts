import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e07 = {
  id: "01a18854-82d1-7f23-8580-9a78ef020fc0",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e07",
  description:
    "Colonel Sheppard finds himself the prisoner of a Genii commander, along with a desperately hungry Wraith who has been separated from his hive.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 7,
  publishedAt: "2006-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168505",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/7",
    },
  ],
  title: "Common Ground",
  episodeType: "standard",
  stillPath: "/ogXoxpQt7HUlTDHRHDDIaKCOh6Y.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
