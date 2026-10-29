import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e12 = {
  id: "01a1884b-ef6d-7927-8ace-c9bac49a6665",
  type: "page-type/episode",
  slug: "ncis-s08e12",
  description:
    "A Petty Officer's recruitment session at a college fair comes to a fatal end, prompting the NCIS team, accompanied by Dr. Mallard's predecessor, to solve his murder.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 12,
  publishedAt: "2011-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334578",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/12",
    },
  ],
  title: "Recruited",
  episodeType: "standard",
  stillPath: "/jqvjjEmqAMLhQHNgR4sNI3YbeUC.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
