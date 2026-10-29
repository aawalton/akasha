import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e10 = {
  id: "01a18851-3df6-7b19-89c9-f43672f1876a",
  type: "page-type/episode",
  slug: "person-of-interest-s04e10",
  description:
    "Samaritan shows its power by erasing crime from the city for a day in an attempt to force The Machine out of hiding.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 10,
  publishedAt: "2014-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1019796",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/10",
    },
  ],
  title: "The Cold War",
  episodeType: "mid-season",
  stillPath: "/aI9x5DWGL8yP0R5FDj4mkknj00Y.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
