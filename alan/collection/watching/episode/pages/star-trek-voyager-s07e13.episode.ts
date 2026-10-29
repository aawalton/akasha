import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e13 = {
  id: "01a18853-ac92-777b-9302-26a708759f3f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e13",
  description:
    "Stardate: 54474.6 - When Voyager provides emergency transportation for alien prisoners sentenced to die, a medical procedure unexpectedly and radically changes the values and temperament of one of the prisoners.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 13,
  publishedAt: "2001-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466839",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/13",
    },
  ],
  title: "Repentance",
  episodeType: "standard",
  stillPath: "/fhe2pEExnz6kIACHmDeqVzUqmO8.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
