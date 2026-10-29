import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e07 = {
  id: "01a18852-d431-7761-849c-09a7afb73e46",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e07",
  description:
    "Archer, Mayweather and T'Pol travel to an arctic world to apprehend a fugitive, when T'Pol is contacted by Vulcan High Command. The mission takes a dangerous turn when T'Pol begins having flashbacks that suggest the events she remembers about a former mission may not accurately relate to what happened.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 7,
  publishedAt: "2002-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15567",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/7",
    },
  ],
  title: "The Seventh",
  episodeType: "standard",
  stillPath: "/6hDRuDDNUJ9EtM1rM0dOLuGeVq1.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
