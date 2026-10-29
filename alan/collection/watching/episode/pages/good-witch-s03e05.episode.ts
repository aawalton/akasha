import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e05 = {
  id: "01a18849-3528-7cee-b0c7-6c004fe14724",
  type: "page-type/episode",
  slug: "good-witch-s03e05",
  description:
    "A visiting chef can't relax, so she follows Cassie's advice and spends a day stirring a recipe in order to quiet her mind. Grace is presented with the Merriwick Wish Book for her birthday and is encouraged to make an entry.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 5,
  publishedAt: "2017-05-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1300324",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/5",
    },
  ],
  title: "A Birthday Wish",
  episodeType: "standard",
  stillPath: "/wDroZL6dpe1tcR5uM5nEPT6WLj8.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
