import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e12 = {
  id: "01a18853-ac92-7810-95ba-05f3afbe9652",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e12",
  description:
    "Stardate: 54452.6 - When B'Elanna learns she is pregnant, she tries to proactively repress her child's Klingon heritage on the basis of her own troubled past.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 12,
  publishedAt: "2001-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466838",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/12",
    },
  ],
  title: "Lineage",
  episodeType: "standard",
  stillPath: "/nKH8qI8EhuOzNznSzKtXUumP0Sl.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
