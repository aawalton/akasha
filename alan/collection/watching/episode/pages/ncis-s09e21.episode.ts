import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e21 = {
  id: "01a1884b-ef6f-7841-9386-6643b8c9e45d",
  type: "page-type/episode",
  slug: "ncis-s09e21",
  description:
    "After a warehouse fire reveals missing Navy documents, posing a potential threat to national security, the NCIS team joins the Baltimore P.D. investigation, reuniting Tony with a boy from his past.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 21,
  publishedAt: "2012-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334612",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/21",
    },
  ],
  title: "Rekindled",
  episodeType: "standard",
  stillPath: "/zN5AMKvfF9dGmYt94PD2LR88DPn.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
