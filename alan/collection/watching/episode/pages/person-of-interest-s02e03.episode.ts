import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e03 = {
  id: "01a18851-3df4-7cf8-a14d-a914ce6c0437",
  type: "page-type/episode",
  slug: "person-of-interest-s02e03",
  description:
    "With Finch back in the Library, Reese returns to field work, only to face his toughest case yet – protecting the privileged daughter of a Brazilian diplomat.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 3,
  publishedAt: "2012-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64080",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/3",
    },
  ],
  title: "Masquerade",
  episodeType: "standard",
  stillPath: "/pipnaHFLELmvkMUDcFd2VA2oiUl.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
