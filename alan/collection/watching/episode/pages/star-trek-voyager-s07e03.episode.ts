import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e03 = {
  id: "01a18853-ac92-7139-bd0c-0dbffffd5bc6",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e03",
  description:
    "Stardate: 54058.6 - Torres and Paris' relationship takes a twist on the eve of a shuttle racing event Paris has entered, celebrating the anniversary of a peace treaty in a former war zone.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 3,
  publishedAt: "2000-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466821",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/3",
    },
  ],
  title: "Drive",
  episodeType: "standard",
  stillPath: "/w5kkFfWM8Z62xHual6TBcQOoLX4.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
