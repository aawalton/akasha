import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e10 = {
  id: "01a1884b-ef76-712e-9558-123a243c26b1",
  type: "page-type/episode",
  slug: "ncis-s15e10",
  description:
    "As Torres and Sloane run protection detail for U.S. Senator John Phillips in Afghanistan for the holidays, they must urgently return to the States after hearing the senator’s son is in the ICU.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 10,
  publishedAt: "2017-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402015",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/10",
    },
  ],
  title: "Double Down",
  episodeType: "mid-season",
  stillPath: "/m2fRYlz4Ttsf4vb8rHGsikffliA.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
