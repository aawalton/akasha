import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e17 = {
  id: "01a18853-ac8b-781b-80db-e3a6b33f32d9",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e17",
  description:
    "Stardate: 49447. When Voyager encounters a Cardassian missile ship in the Delta Quadrant named 'Dreadnought', B'Elanna must disarm it before it destroys a planet with millions of innocent people.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 17,
  publishedAt: "1996-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113018",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/17",
    },
  ],
  title: "Dreadnought",
  episodeType: "standard",
  stillPath: "/eUTSjqHH0nbU2xA9lBnpaapqNr1.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
