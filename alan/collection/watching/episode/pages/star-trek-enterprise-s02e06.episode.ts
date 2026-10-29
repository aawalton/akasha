import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e06 = {
  id: "01a18852-d431-7a93-ba77-ec9dc275cc63",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e06",
  description:
    "In need of fuel, the Enterprise arrives at a Quonset mining colony for deuterium supplies. They discover that Klingons are forcing the colonists to give up all their deuterium. Archer and the rest of the crew work to train the colonists so they can fight back against the Klingons.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 6,
  publishedAt: "2002-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15577",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/6",
    },
  ],
  title: "Marauders",
  episodeType: "standard",
  stillPath: "/395SCFCINSTk1PkIyLV487NuzUv.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
