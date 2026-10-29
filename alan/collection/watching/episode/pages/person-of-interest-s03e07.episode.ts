import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e07 = {
  id: "01a18851-3df5-71ff-aec4-2d7144824978",
  type: "page-type/episode",
  slug: "person-of-interest-s03e07",
  description:
    "The team is met with surprises during an investigation into a hypnotherapist; an antiquities dealer has ties to a crime organization.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 7,
  publishedAt: "2013-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970559",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/7",
    },
  ],
  title: "The Perfect Mark",
  episodeType: "standard",
  stillPath: "/5QiGFyMTpsDgYLDjktrY7F4uddJ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
