import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e07 = {
  id: "01a18844-d7eb-79d6-9b10-6929d01185d6",
  type: "page-type/episode",
  slug: "criminal-minds-s05e07",
  description:
    "The BAU team investigates the mystery behind a trail of murders that all seem to align with the tour schedule of a rock star.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 7,
  publishedAt: "2009-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283242",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/7",
    },
  ],
  title: "The Performer",
  episodeType: "standard",
  stillPath: "/iY77PKHFjO6u2K13EnumLkIV2jZ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
