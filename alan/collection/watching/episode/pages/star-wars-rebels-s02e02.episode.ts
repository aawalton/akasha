import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e02 = {
  id: "01a18853-ddfc-70fa-84a9-6ea365625293",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e02",
  description:
    "Ezra and the others are starting to form friendships with the old Clone Troopers, but Kanan can't seem to bring himself to trust them. Will he feel differently when pressure from the Empire forces them to work together?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 2,
  publishedAt: "2015-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1131589",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/2",
    },
  ],
  title: "Relics of the Old Republic",
  episodeType: "standard",
  stillPath: "/g6Bps9OOvYscLdl4Cn1IyK7Eju7.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
