import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const returnToThePlanetOfTheApesS01e01 = {
  id: "01a18851-5ef4-7a2d-86f6-4eb725573623",
  type: "page-type/episode",
  slug: "return-to-the-planet-of-the-apes-s01e01",
  description:
    "A trio of astronauts are thrust forward in time. They find themselves fugitives after crash-landing on the Planet of the Apes.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/return-to-the-planet-of-the-apes-season-1"],
  position: 1,
  publishedAt: "1975-09-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480990",
      externalLink: "https://www.themoviedb.org/tv/12443/season/1/episode/1",
    },
  ],
  title: "Flames of Doom",
  episodeType: "standard",
  stillPath: "/vdJ6tbU4Kk5tT6oBbShZIitzpQK.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:39:56.532Z",
  updatedAt: "2026-10-29T15:39:56.532Z",
} as const satisfies Episode
