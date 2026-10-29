import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS05e01 = {
  id: "01a18843-982b-7978-9a96-dc647055642d",
  type: "page-type/episode",
  slug: "black-mirror-s05e01",
  description:
    "When old college friends Danny and Karl reconnect in a VR version of their favorite video game, the late-night sessions yield an unexpected discovery.",
  ownLength: 62,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-5"],
  position: 1,
  publishedAt: "2019-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1791583",
      externalLink: "https://www.themoviedb.org/tv/42009/season/5/episode/1",
    },
  ],
  title: "Striking Vipers",
  episodeType: "standard",
  stillPath: "/t8uIVDjfCoutXHwIRZoUX8XpNS2.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
