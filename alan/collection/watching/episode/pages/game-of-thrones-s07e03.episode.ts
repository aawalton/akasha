import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS07e03 = {
  id: "01a18849-08b5-78ff-b58c-6493eb589af4",
  type: "page-type/episode",
  slug: "game-of-thrones-s07e03",
  description:
    "Daenerys holds court. Tyrion backchannels. Cersei returns a gift. Jaime learns from his mistakes.",
  ownLength: 63,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-7"],
  position: 3,
  publishedAt: "2017-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1336115",
      externalLink: "https://www.themoviedb.org/tv/1399/season/7/episode/3",
    },
  ],
  title: "The Queen's Justice",
  episodeType: "standard",
  stillPath: "/xSqdpR6qADmjsdlcJLX5LXRToQP.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
