import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e21 = {
  id: "01a1884b-ef67-7247-b9f2-c22ab04b1d63",
  type: "page-type/episode",
  slug: "ncis-s04e21",
  description:
    "Director Shepard makes a huge mistake by meeting a man alone to inform her about La Grenouille, as their meeting turns into a murder of the informant. Now the NCIS team must gather all the existing info and try to finally hunt down their enemy.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 21,
  publishedAt: "2007-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334491",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/21",
    },
  ],
  title: "Brothers in Arms",
  episodeType: "standard",
  stillPath: "/w1IBaOoPBtjd78331nIybRCAHuG.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
