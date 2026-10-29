import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e02 = {
  id: "01a18852-a9f5-7364-999c-7e73828f9078",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e02",
  description:
    "Face to face with Klingon vessels, the U.S.S. Shenzhou prepares for the possibility of war if negotiations fail. Amidst the turmoil, Burnham looks back to her Vulcan upbringing for guidance.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 2,
  publishedAt: "2017-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1330321",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/2",
    },
  ],
  title: "Battle at the Binary Stars",
  episodeType: "standard",
  stillPath: "/sg0tltyFlESVGISvxHlsWnW2pVC.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
