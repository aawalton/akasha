import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e25 = {
  id: "01a18852-d432-7524-8cb4-feac9a012baf",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e25",
  description:
    "Archer learns the Klingons have put a price on his head when he is captured by a Tellarite bounty hunter. As Enterprise pursues, a virus causes T'Pol to go into premature Pon Farr.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 25,
  publishedAt: "2003-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15581",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/25",
    },
  ],
  title: "Bounty",
  episodeType: "standard",
  stillPath: "/kEKzrDjj79bxbjq04Zg4VuP2lDe.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
