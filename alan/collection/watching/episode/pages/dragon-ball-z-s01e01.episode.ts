import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS01e01 = {
  id: "01a183dc-560f-7f13-89f6-98bb11ec8f15",
  type: "page-type/episode",
  slug: "dragon-ball-z-s01e01",
  description:
    "Goku’s quiet life with his family and friends is about to be interrupted. A new threat - a powerful and sinister alien - is on its way to Earth.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-1"],
  position: 1,
  publishedAt: "1989-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969581",
      externalLink: "https://www.themoviedb.org/tv/12971/season/1/episode/1",
    },
  ],
  title: "The New Threat",
  episodeType: "standard",
  stillPath: "/qcYJj4oIkAWpPbOE1LjXJ2l2d6W.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
