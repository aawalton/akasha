import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e15 = {
  id: "01a18851-3df5-7861-be05-abe7b95d572c",
  type: "page-type/episode",
  slug: "person-of-interest-s03e15",
  description:
    "Finch goes undercover in an emergency call center to protect a 911 operator, but it soon becomes clear that the threat reaches further than the team could have anticipated.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 15,
  publishedAt: "2014-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "971599",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/15",
    },
  ],
  title: "Last Call",
  episodeType: "standard",
  stillPath: "/nsmikDxcd2v1IUvFQcDGpC0hpMy.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
