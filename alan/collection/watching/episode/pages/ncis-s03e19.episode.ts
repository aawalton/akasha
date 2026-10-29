import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e19 = {
  id: "01a1884b-ef65-77e7-bd0f-7cd6b8c6bc17",
  type: "page-type/episode",
  slug: "ncis-s03e19",
  description:
    "Gibbs and the team are called in when a couple of kids stumble upon the body of a missing Marine in a frozen lake. As the NCIS team search the frozen lake bed for clues, they come across three more bullet-ridden bodies.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 19,
  publishedAt: "2006-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334535",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/19",
    },
  ],
  title: "Iced",
  episodeType: "standard",
  stillPath: "/zDF4r4GB51XouXX7hEyhEW35jfB.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
