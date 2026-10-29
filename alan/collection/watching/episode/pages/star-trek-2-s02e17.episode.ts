import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e17 = {
  id: "01a1887f-e189-745f-8a18-fe3c637ccb49",
  type: "page-type/episode",
  slug: "star-trek-2-s02e17",
  description: "The Enterprise visits a planet with an Earth-like 1920s gangster culture.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 17,
  publishedAt: "1968-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14005",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/17",
    },
  ],
  title: "A Piece of the Action",
  episodeType: "standard",
  stillPath: "/i35XzM7hyiTc66soejswSeSgF13.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
