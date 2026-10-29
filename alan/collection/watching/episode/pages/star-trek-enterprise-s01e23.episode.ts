import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e23 = {
  id: "01a18852-d430-7441-bc48-2fcbaf8384da",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e23",
  description:
    "Enterprise is sent to the planet Mazar to pick up a Vulcan ambassador who has been expelled for misconduct.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 23,
  publishedAt: "2002-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15558",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/23",
    },
  ],
  title: "Fallen Hero",
  episodeType: "standard",
  stillPath: "/7rbum6UkJh6G6DNSYQZLmGkL2SJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
