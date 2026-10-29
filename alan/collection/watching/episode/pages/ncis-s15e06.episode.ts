import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e06 = {
  id: "01a1884b-ef76-7ff9-bf00-3f3d38a131ef",
  type: "page-type/episode",
  slug: "ncis-s15e06",
  description:
    "A Petty Officer is found murdered on a golf course, and McGee spends hours on the victim’s ham radio trying to locate a key witness.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 6,
  publishedAt: "2017-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1387584",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/6",
    },
  ],
  title: "Trapped",
  episodeType: "standard",
  stillPath: "/80S9iXwK8F53LdkGpbMD10klze.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
