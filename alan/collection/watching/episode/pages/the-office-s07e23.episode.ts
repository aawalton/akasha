import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e23 = {
  id: "01a18857-c36d-768b-b3f0-b728bb32aea1",
  type: "page-type/episode",
  slug: "the-office-s07e23",
  description:
    "Dwight takes charge of the office and immediately imposes his will on the staff. Gabe hopes to get back together with Erin.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 23,
  publishedAt: "2011-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170290",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/23",
    },
  ],
  title: "Dwight K. Schrute, (Acting) Manager",
  episodeType: "standard",
  stillPath: "/x02spA1t1rLwl2XRrdRNKOLv10Q.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
