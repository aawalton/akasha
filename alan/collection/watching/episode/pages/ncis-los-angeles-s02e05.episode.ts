import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e05 = {
  id: "01a1884a-e0e9-794f-96a8-295a55a9f69f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e05",
  description:
    "The team races against time to save a Naval Commander's daughter after seeing a video of her being buried alive.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 5,
  publishedAt: "2010-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557301",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/5",
    },
  ],
  title: "Little Angels",
  episodeType: "standard",
  stillPath: "/yP8E26U9N8Fg7bnYvlCozOfjGQb.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
