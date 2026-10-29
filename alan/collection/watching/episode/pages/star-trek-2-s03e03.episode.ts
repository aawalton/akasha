import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e03 = {
  id: "01a1887f-e189-75c4-8baf-0ad5ca0ba2d5",
  type: "page-type/episode",
  slug: "star-trek-2-s03e03",
  description:
    "An alien device on a primitive planet erases Captain Kirk's memory, and he begins a new life with the planet's indigenous people.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 3,
  publishedAt: "1968-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14013",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/3",
    },
  ],
  title: "The Paradise Syndrome",
  episodeType: "standard",
  stillPath: "/ePCAWVVweZrpoAhEP8fOOordSc0.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
