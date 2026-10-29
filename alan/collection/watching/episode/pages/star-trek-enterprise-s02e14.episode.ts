import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e14 = {
  id: "01a18852-d431-7ab7-9cc7-47528f9f6584",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e14",
  description:
    "Enterprise visits a planet where an Interspecies Medical Exchange conference is being held. Dr. Phlox tries to obtain research on a terminal disease from the Vulcan contingency, without revealing T'Pol has been infected by it.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 14,
  publishedAt: "2003-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15571",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/14",
    },
  ],
  title: "Stigma",
  episodeType: "standard",
  stillPath: "/vrN4l9iXrRlEUeWGTBsTO5tKhdR.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
