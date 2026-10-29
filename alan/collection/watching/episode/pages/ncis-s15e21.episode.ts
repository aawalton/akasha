import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e21 = {
  id: "01a1884b-ef77-7618-bf72-b37f22ed0405",
  type: "page-type/episode",
  slug: "ncis-s15e21",
  description:
    "Sara Carter begs Gibbs to investigate her mother's murder - she believes the wrong man was convicted.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 21,
  publishedAt: "2018-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1472107",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/21",
    },
  ],
  title: "One Step Forward",
  episodeType: "standard",
  stillPath: "/mwpxCBIF4b8Sx8iM4mH1RazNxO.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
