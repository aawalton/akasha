import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e17 = {
  id: "01a18852-d434-766a-94b4-4e77f3885fbd",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e17",
  description:
    "As a gift for negotiating with the Orion Syndicate, Captain Archer receives three Orion Slave Girls.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 17,
  publishedAt: "2005-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15615",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/17",
    },
  ],
  title: "Bound",
  episodeType: "standard",
  stillPath: "/18ABm7O0VNwqS5ucKNFx6WEgIMC.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
