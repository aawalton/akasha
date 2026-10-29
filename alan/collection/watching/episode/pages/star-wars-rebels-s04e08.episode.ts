import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e08 = {
  id: "01a18853-ddff-7592-af4e-969197d56f00",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e08",
  description:
    "Desperate to contact Rebel command, the Ghost crew pirates a mining vehicle with long range communications gear, but the Empire arrives to spoil their plans.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 8,
  publishedAt: "2017-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382175",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/8",
    },
  ],
  title: "Crawler Commandeers",
  episodeType: "standard",
  stillPath: "/hWWW3UBvgkC5Tq7o43oKRpy8IJP.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
