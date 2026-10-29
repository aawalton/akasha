import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e19 = {
  id: "01a1884b-ef6f-7732-b937-d5c6ba1d10d0",
  type: "page-type/episode",
  slug: "ncis-s09e19",
  description:
    "A case hits close to home when the lead suspect in the murder of a Petty Officer is Director Vance's brother-in-law.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 19,
  publishedAt: "2012-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334608",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/19",
    },
  ],
  title: "The Good Son",
  episodeType: "standard",
  stillPath: "/rEjlQg5E6XIY7ioN6wQiXexwcHf.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
