import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e08 = {
  id: "01a18853-ac92-7343-931d-5f9ed9ea5373",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e08",
  description:
    "Stardate: 54274.7 - Ensign Kim finds himself making the hard choices of mission commander when he agrees to help the crew of a ship in need.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 8,
  publishedAt: "2000-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466829",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/8",
    },
  ],
  title: "Nightingale",
  episodeType: "standard",
  stillPath: "/1r7xDorx5RNAJNtPZAEKQKvA3yx.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
