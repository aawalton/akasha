import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e20 = {
  id: "01a18880-75e5-7e98-be2c-b863c0d147f3",
  type: "page-type/episode",
  slug: "the-mentalist-s01e20",
  description:
    "Patrick Jane and the CBI team investigate the murder of a mobster who was in the witness protection program.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 20,
  publishedAt: "2009-04-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367708",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/20",
    },
  ],
  title: "Red Sauce",
  episodeType: "standard",
  stillPath: "/eo9LSRl6H3N9iKogKnTNZlrmDvY.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
