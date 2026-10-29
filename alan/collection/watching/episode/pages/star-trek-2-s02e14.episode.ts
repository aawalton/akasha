import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e14 = {
  id: "01a1887f-e188-703f-9aa3-becf97ef8193",
  type: "page-type/episode",
  slug: "star-trek-2-s02e14",
  description: "A series of bizarre murders points to Mr. Scott as the prime suspect.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-2"],
  position: 14,
  publishedAt: "1967-12-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13995",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/14",
    },
  ],
  title: "Wolf in the Fold",
  episodeType: "standard",
  stillPath: "/ext4qwWraIfKyW8KbO9QP2icPoF.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
