import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e19 = {
  id: "01a18852-d434-7684-81e1-aca06b709217",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e19",
  description:
    "In the mirror universe, Archer commandeers the 23rd-century Defiant from the Tholians and uses it in a nefarious power grab.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 19,
  publishedAt: "2005-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15630",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/19",
    },
  ],
  title: "In a Mirror, Darkly (2)",
  episodeType: "standard",
  stillPath: "/gQlZdrxlcFDMO1Si9JVC8bf9GH7.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
