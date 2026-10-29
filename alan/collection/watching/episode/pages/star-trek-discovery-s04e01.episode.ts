import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e01 = {
  id: "01a18852-a9f7-7af1-a70d-bc1eb49d24c6",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e01",
  description:
    "After months spent reconnecting the Federation with distant worlds, Captain Michael Burnham and the crew of the U.S.S. Discovery are sent to assist a damaged space station – a seemingly routine mission that reveals the existence of a terrifying new threat.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 1,
  publishedAt: "2021-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3098572",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/1",
    },
  ],
  title: "Kobayashi Maru",
  episodeType: "standard",
  stillPath: "/6RsRTvxI2Sv6mNmBOOLuEmiAEcy.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
