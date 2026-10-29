import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e01 = {
  id: "01a18853-ac90-7882-9637-4c649e9336c5",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e01",
  description:
    "Stardate: Unknown. As Janeway's determination to capture Captain Ransom becomes an obsession, Ransom begins having second thoughts about his methods.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 1,
  publishedAt: "1999-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113363",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/1",
    },
  ],
  title: "Equinox (2)",
  episodeType: "standard",
  stillPath: "/63OASrhWKSgCtg73jNnSGkK5rOW.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
