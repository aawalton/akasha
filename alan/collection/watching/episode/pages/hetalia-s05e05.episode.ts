import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS05e05 = {
  id: "01a183d7-7ce6-779a-86e1-1d8d023b5684",
  type: "page-type/episode",
  slug: "hetalia-s05e05",
  description:
    "Prussia tells the tale of how countries that once made up the Holy Roman Empire became unified as one country. A brief summary is shown about the history of beer.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-5"],
  position: 5,
  publishedAt: "2015-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826989",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5/episode/5",
    },
  ],
  title: "The Life of the Great Man, the Awesome Me",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
