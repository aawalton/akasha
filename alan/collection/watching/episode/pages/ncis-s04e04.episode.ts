import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e04 = {
  id: "01a1884b-ef66-727e-91da-c1005772409d",
  type: "page-type/episode",
  slug: "ncis-s04e04",
  description:
    "After police pull over a driver and arrest him for a concealed weapon, a car crashes into their patrol car with a dead man behind the wheel. The arrested man turns out to be Russian and Homeland Security claim he was working for them.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 4,
  publishedAt: "2006-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334472",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/4",
    },
  ],
  title: "Faking It",
  episodeType: "standard",
  stillPath: "/wSk2sG6pmBmyGpbAoyEP2Pu90GD.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
