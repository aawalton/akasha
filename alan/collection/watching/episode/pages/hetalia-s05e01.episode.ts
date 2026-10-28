import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS05e01 = {
  id: "01a183d7-7ce6-702d-ae35-13a3c6270187",
  type: "page-type/episode",
  slug: "hetalia-s05e01",
  description:
    "Shows a little more from the neko nations, such as France-cat's taste in his Parisian home, and introduces Spain-cat and Turkey-cat.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-5"],
  position: 1,
  publishedAt: "2015-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826985",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5/episode/1",
    },
  ],
  title: "Nekotalia Once Again",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
