import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS05e12 = {
  id: "01a18880-75ea-7075-9bdd-87390811832f",
  type: "page-type/episode",
  slug: "the-mentalist-s05e12",
  description:
    "The CBI investigates the death of a geologist, which Lisbon is convinced is the key to bringing down Tommy Volker.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-5"],
  position: 12,
  publishedAt: "2013-01-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367798",
      externalLink: "https://www.themoviedb.org/tv/5920/season/5/episode/12",
    },
  ],
  title: "Little Red Corvette",
  episodeType: "standard",
  stillPath: "/3kBULPI3lreQQlGvj2eblaAGX0S.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
