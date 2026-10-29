import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e18 = {
  id: "01a18852-d434-734f-a4eb-219c54c643bf",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e18",
  description:
    "In the mirror universe, Commander Archer mutinies against Captain Forrest in order to capture a future Earth ship found in Tholian space.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 18,
  publishedAt: "2005-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15631",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/18",
    },
  ],
  title: "In a Mirror, Darkly (1)",
  episodeType: "standard",
  stillPath: "/xiNUlVsmnGSVOEUGgwD80TteQLa.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
