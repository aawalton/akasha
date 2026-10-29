import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e04 = {
  id: "01a18852-d431-7c7c-b7f2-7ba966f3282f",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e04",
  description:
    "Suffering from damage inflicted in the Romulan minefield and unable to complete repairs on their own, Archer orders a distress call to be put out. A response leads Enterprise to a repair station, which surprisingly has no crew aboard it and is run by computer. Repairs on Enterprise are carried out quite efficiently and quickly, though the price for all this is much higher than the crew could've guessed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 4,
  publishedAt: "2002-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15565",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/4",
    },
  ],
  title: "Dead Stop",
  episodeType: "standard",
  stillPath: "/drJy5npGSygzomw0IR08rRGRJgR.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
