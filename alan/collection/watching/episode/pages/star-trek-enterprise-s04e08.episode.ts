import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e08 = {
  id: "01a18852-d433-7252-8897-b1701603619b",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e08",
  description:
    "Archer and T'Pol encounter the Syrrannites, a radical group hiding in the Vulcan desert, while the NX-01 crew contends with Vulcan power ploys.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 8,
  publishedAt: "2004-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15619",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/8",
    },
  ],
  title: "Awakening (2)",
  episodeType: "standard",
  stillPath: "/382UEO9RDwL7M2gvxCDHZiwzAqn.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
