import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e07 = {
  id: "01a1887f-e188-7f97-b993-4ba903da7559",
  type: "page-type/episode",
  slug: "star-trek-2-s02e07",
  description: "Two powerful aliens threaten the well-being of the Enterprise and her crew.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 7,
  publishedAt: "1967-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13990",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/7",
    },
  ],
  title: "Catspaw",
  episodeType: "standard",
  stillPath: "/qQ9h3xm6dpWWHh9GU9QIq4xGVFu.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
