import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e20 = {
  id: "01a1884b-ef77-711c-afb0-b84abe7a3651",
  type: "page-type/episode",
  slug: "ncis-s15e20",
  description:
    "NCIS searches for a Petty Officer suspected of assault who escapes when the sheriff transporting him crashes into a lake.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 20,
  publishedAt: "2018-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1460741",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/20",
    },
  ],
  title: "Sight Unseen",
  episodeType: "standard",
  stillPath: "/vhbDQIg9y2DKWd11YmDF682wqSj.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
