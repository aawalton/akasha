import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e19 = {
  id: "01a18880-75e5-79c2-afe3-897049d715d9",
  type: "page-type/episode",
  slug: "the-mentalist-s01e19",
  description:
    "Patrick Jane and the team go to Hollywood when they investigate the murder of a movie producer.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 19,
  publishedAt: "2009-04-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367707",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/19",
    },
  ],
  title: "A Dozen Red Roses",
  episodeType: "standard",
  stillPath: "/laEDZyGBwpohflDrPyS6U48Q55Q.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
