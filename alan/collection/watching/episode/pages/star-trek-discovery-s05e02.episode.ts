import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS05e02 = {
  id: "01a18852-a9f8-72eb-91f9-c162da39c64a",
  type: "page-type/episode",
  slug: "star-trek-discovery-s05e02",
  description:
    "On Saru's last mission as Captain Burnham's Number One, the team ventures to a seemingly abandoned planet to hunt for what might be the greatest treasure in the galaxy.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-5"],
  position: 2,
  publishedAt: "2024-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4973635",
      externalLink: "https://www.themoviedb.org/tv/67198/season/5/episode/2",
    },
  ],
  title: "Under the Twin Moons",
  episodeType: "standard",
  stillPath: "/9pHRNAnU7ZsKV03KvHKkWWX9c0i.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
