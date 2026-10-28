import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS02e101 = {
  id: "01a183d1-bb4e-792c-9ebe-b6c8f8fc0799",
  type: "page-type/episode",
  slug: "naruto-s02e101",
  description:
    "After their mission, Naruto persuades Sakura and Sasuke to help him unmask their sensei, Kakashi. However, Squad 7 soon finds out that this is easier said than done...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-2"],
  position: 101,
  publishedAt: "2004-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1151750",
      externalLink: "https://www.themoviedb.org/tv/46260/season/2/episode/101",
    },
  ],
  title: "Gotta See! Gotta Know! Kakashi-Sensei's True Face!",
  episodeType: "standard",
  stillPath: "/4Lch0D357BnvIgR5NtbKIA0JO7S.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
