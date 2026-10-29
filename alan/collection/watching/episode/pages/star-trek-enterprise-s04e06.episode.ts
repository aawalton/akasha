import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e06 = {
  id: "01a18852-d433-7826-beb1-a66b048e06f3",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e06",
  description:
    'In defiance of their "father," Arik Soong\'s Augments devise a heinous plot against the Klingons which will surely lead to interstellar war.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 6,
  publishedAt: "2004-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15620",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/6",
    },
  ],
  title: "The Augments (3)",
  episodeType: "standard",
  stillPath: "/ziTaFZZP4tp4t4XLsrGXaztj8X0.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
