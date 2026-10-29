import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e02 = {
  id: "01a18851-3df7-7913-a0dd-cde6834409ed",
  type: "page-type/episode",
  slug: "person-of-interest-s05e02",
  description:
    "The Machine experiences a glitch during rebooting, supplying Reese and Fusco with the numbers of dozens of people not actually involved in crimes, while also locking Finch and Root out after identifying them as threats based on past violent behavior.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 2,
  publishedAt: "2016-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176498",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/2",
    },
  ],
  title: "SNAFU",
  episodeType: "standard",
  stillPath: "/6mdGr5DIgXDWT33O9PSw24YsWwk.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
