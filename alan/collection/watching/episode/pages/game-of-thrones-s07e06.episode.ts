import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS07e06 = {
  id: "01a18849-08b5-7a36-b87a-029ccc03eec7",
  type: "page-type/episode",
  slug: "game-of-thrones-s07e06",
  description:
    "Jon and the Brotherhood hunt the dead. Arya confronts Sansa. Tyrion thinks about the future.",
  ownLength: 70,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-7"],
  position: 6,
  publishedAt: "2017-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1340527",
      externalLink: "https://www.themoviedb.org/tv/1399/season/7/episode/6",
    },
  ],
  title: "Beyond the Wall",
  episodeType: "standard",
  stillPath: "/3cUZWo0YrAkBT64uzim542ypeF7.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
