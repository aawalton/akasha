import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e08 = {
  id: "01a18843-5081-7c6b-97ab-3619574a1794",
  type: "page-type/episode",
  slug: "babylon-5-s03e08",
  description:
    "An archaeologist arrives at Babylon 5 with a grave message: a dormant Shadow ship has been found on Ganymede. It must be destroyed before it falls into the hands of President Clark.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 8,
  publishedAt: "1996-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235984",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/8",
    },
  ],
  title: "Messages from Earth",
  episodeType: "standard",
  stillPath: "/cCJiMWG5kx9FK9DqWbNYnzqISoz.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
