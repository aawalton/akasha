import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e02 = {
  id: "01a18851-3df6-7d4c-8401-79a59def4a6c",
  type: "page-type/episode",
  slug: "person-of-interest-s04e02",
  description:
    "Despite not wanting to help with the new numbers, Finch's interest is piqued when the newest person of interest turns out to be a brilliant college student involved with a mysterious scavenger hunt.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 2,
  publishedAt: "2014-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005683",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/2",
    },
  ],
  title: "Nautilus",
  episodeType: "standard",
  stillPath: "/oMZMcYQ1NTkDostPm0z2mAgXAKW.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
