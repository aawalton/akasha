import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e09 = {
  id: "01a1884b-ef63-750e-bc1d-f755dce45599",
  type: "page-type/episode",
  slug: "ncis-s02e09",
  description:
    "Laura Rowen, a Marine's wife, shoots an intruder in self defense when he is about to rape her. The team take on the case and find out that the wife is leading a double life while her husband is serving overseas.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 9,
  publishedAt: "2004-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334504",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/9",
    },
  ],
  title: "Forced Entry",
  episodeType: "standard",
  stillPath: "/xD70qaFE4TgVAJ3YmdDhpfDdoPl.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
