import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e05 = {
  id: "01a18852-d431-783b-a893-5cc35d1ca2ec",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e05",
  description:
    "Archer spends a night in sickbay with Dr. Phlox after Porthos contracts a deadly virus on the Kreetassan homeworld. Crew members suspect Archer's increased stress level is due to Porthos' illness, but Dr. Phlox suspects it has to do with Archer's repressed sexual tension.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 5,
  publishedAt: "2002-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15564",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/5",
    },
  ],
  title: "A Night in Sickbay",
  episodeType: "standard",
  stillPath: "/g5Up6WAfvqwWiIKPypnnxIrhwaV.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
