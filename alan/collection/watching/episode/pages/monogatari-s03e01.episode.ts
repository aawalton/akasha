import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS03e01 = {
  id: "01a183db-793a-7c5f-b916-84361ad38158",
  type: "page-type/episode",
  slug: "monogatari-s03e01",
  description:
    "The first day of the second trimester, Tsubasa Hanekawa chats with the ghost girl Mayoi Hachikuji en route to school. Right afterwards, she witnesses a giant “tiger” apparition. Later that day, her house completely burns down from a fire. ",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-3"],
  position: 1,
  publishedAt: "2013-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907757",
      externalLink: "https://www.themoviedb.org/tv/46195/season/3/episode/1",
    },
  ],
  title: "Tsubasa Tiger (1)",
  episodeType: "standard",
  stillPath: "/1nx4hrCb5q3nlhjl8AuZpiViPqT.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
