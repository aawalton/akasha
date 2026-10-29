import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e10 = {
  id: "01a18851-3df3-7fcc-874b-00c99aca3d93",
  type: "page-type/episode",
  slug: "person-of-interest-s01e10",
  description:
    "As Detective Carter deals with the fallout from her recent encounter with Reese and Finch, The Machine ups the ante for the duo by giving them four Social Security numbers instead of one.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 10,
  publishedAt: "2011-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64064",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/10",
    },
  ],
  title: "Number Crunch",
  episodeType: "mid-season",
  stillPath: "/s5NO0uTgkzA5bB5LBrracqhdRnh.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
