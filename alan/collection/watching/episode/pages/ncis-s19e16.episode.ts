import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e16 = {
  id: "01a1884b-ef80-7a28-a01f-55e5399c1fd7",
  type: "page-type/episode",
  slug: "ncis-s19e16",
  description:
    "A gruesome mishap at a Petty Officer’s gender-reveal party leads NCIS to the case of a missing teacher that was popularized on a true crime podcast.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 16,
  publishedAt: "2022-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248860",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/16",
    },
  ],
  title: "The Wake",
  episodeType: "standard",
  stillPath: "/pAJcFnSrqRmU6ZAXLzyVZdrf4pf.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
