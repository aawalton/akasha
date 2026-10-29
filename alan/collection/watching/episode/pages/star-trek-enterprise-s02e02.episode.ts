import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e02 = {
  id: "01a18852-d430-7fa9-aae2-8428db6234fd",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e02",
  description:
    "After Archer and Trip become curious about a visit she made to a Pennsylvania mining town called Carbon Creek, T'Pol explains to them that Vulcans actually had their first contact with humans in 1957. That year, a Vulcan ship crashed on Earth and three crew members survived, including T'Pol's great grandmother. They pose as humans in Carbon Creek and take on jobs while waiting for rescue and soon find themselves becoming more involved with the town's residents.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 2,
  publishedAt: "2002-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15563",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/2",
    },
  ],
  title: "Carbon Creek",
  episodeType: "standard",
  stillPath: "/xi51ULn1HdRTxpA7B0b1TKEAxoR.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
