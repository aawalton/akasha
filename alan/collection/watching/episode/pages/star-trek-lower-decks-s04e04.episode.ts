import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS04e04 = {
  id: "01a18852-f34c-77ff-b847-e65f67afc528",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s04e04",
  description: "Tendi is summoned back to Orion for a wedding.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-4"],
  position: 4,
  publishedAt: "2023-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4715261",
      externalLink: "https://www.themoviedb.org/tv/85948/season/4/episode/4",
    },
  ],
  title: "Something Borrowed, Something Green",
  episodeType: "standard",
  stillPath: "/p5bvnB0myao8Ia5k1MikAYOY03L.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
