import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e12 = {
  id: "01a18851-3df4-760d-ac94-e20eb8464797",
  type: "page-type/episode",
  slug: "person-of-interest-s02e12",
  description:
    "Carter tries to help Reese by engaging in mental warfare with the FBI; Reese has encounters with old and new enemies; Detective Fusco must protect supermodel Karolina Kurkova, the latest person of interest.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 12,
  publishedAt: "2013-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64088",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/12",
    },
  ],
  title: "Prisoner's Dilemma",
  episodeType: "standard",
  stillPath: "/lEYOpIRts7bBlu4sFifpp0Gqbw5.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
