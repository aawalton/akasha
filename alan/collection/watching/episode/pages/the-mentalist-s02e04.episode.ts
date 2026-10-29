import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e04 = {
  id: "01a18880-75e6-709a-951e-8163812c74c0",
  type: "page-type/episode",
  slug: "the-mentalist-s02e04",
  description:
    "Jane and the CBI investigate the murder of Gordon Hodge, a powerful attorney, who is responsible for allowing a vicious murderer, Van McBride, to walk away a free man.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 4,
  publishedAt: "2009-10-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367717",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/4",
    },
  ],
  title: "Red Menace",
  episodeType: "standard",
  stillPath: "/iQo1uJRoI7AjBGlYTozSwGMCIjf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
