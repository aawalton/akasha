import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e01 = {
  id: "01a1884b-ef74-7251-85c6-68cf5b71254a",
  type: "page-type/episode",
  slug: "ncis-s14e01",
  description:
    "The NCIS team investigates a deadly car explosion in D.C. that connects to NCIS Special Agent Nicholas “Nick” Torres, who disappeared six months ago while on a deep undercover assignment in Argentina.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 1,
  publishedAt: "2016-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1219031",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/1",
    },
  ],
  title: "Rogue",
  episodeType: "standard",
  stillPath: "/qkOx6Ho1VJ8V9vHGZjtm23Bh8VH.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
