import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e04 = {
  id: "01a18853-f9b0-778a-a564-da32862baeec",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e04",
  description:
    "The pirates volunteer to find food for the Colossus, but Kaz doesn't trust them. Kaz and Torra go on the hunt, but run into big problems.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 4,
  publishedAt: "2019-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953390",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/4",
    },
  ],
  title: "Hunt on Celsor 3",
  episodeType: "standard",
  stillPath: "/nnETrL8ZkEXI5vRg4vvx1CMuJpz.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
