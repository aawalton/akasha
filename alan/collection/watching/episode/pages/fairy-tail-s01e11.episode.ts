import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fairyTailS01e11 = {
  id: "01a183d7-264f-7913-bea7-b970fcd51ddc",
  type: "page-type/episode",
  slug: "fairy-tail-s01e11",
  description:
    "Natsu, Happy and Lucy tread some seriously troubled waters when they break guild rules to take an S-class job request and end up shipwrecked on the cursed Galuna Island!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fairy-tail-season-1"],
  position: 11,
  publishedAt: "2009-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908304",
      externalLink: "https://www.themoviedb.org/tv/46261/season/1/episode/11",
    },
  ],
  title: "The Cursed Island",
  episodeType: "standard",
  stillPath: "/tS9ZIyJyDnx5krTY2EvaXP181zd.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Episode
