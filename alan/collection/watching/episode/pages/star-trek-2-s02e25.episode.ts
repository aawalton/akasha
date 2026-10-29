import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e25 = {
  id: "01a1887f-e189-7a24-9824-fc0622036f00",
  type: "page-type/episode",
  slug: "star-trek-2-s02e25",
  description:
    "The Enterprise crew investigates the disappearance of a ship's crew on a planet that is a modern version of the Roman Empire.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 25,
  publishedAt: "1968-03-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13998",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/25",
    },
  ],
  title: "Bread and Circuses",
  episodeType: "standard",
  stillPath: "/3d8VUoSfrWHprJwlfv0hXLEEzur.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
