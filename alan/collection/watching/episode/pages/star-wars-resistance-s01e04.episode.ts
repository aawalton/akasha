import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e04 = {
  id: "01a18853-f9af-73e8-be29-f2cc2fce87a7",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e04",
  description:
    "The First Order arrives at the platform for mysterious reasons and Kaz and BB-8 are determined to sneak into the tower to find out what they want.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 4,
  publishedAt: "2018-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1589109",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/4",
    },
  ],
  title: "The High Tower",
  episodeType: "standard",
  stillPath: "/gQlsGbpRMJLoZYjsh09omYgqDHk.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
