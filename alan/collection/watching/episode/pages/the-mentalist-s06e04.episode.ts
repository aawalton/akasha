import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS06e04 = {
  id: "01a18880-75eb-734b-8fd9-95055add2f47",
  type: "page-type/episode",
  slug: "the-mentalist-s06e04",
  description:
    "Jane reveals that a list of fake Red John suspects he planted was stolen, and the team realizes these men are in danger.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-6"],
  position: 4,
  publishedAt: "2013-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367812",
      externalLink: "https://www.themoviedb.org/tv/5920/season/6/episode/4",
    },
  ],
  title: "Red Listed",
  episodeType: "standard",
  stillPath: "/gCafmcnTzpCmL61QwKn6hSJeJCM.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
