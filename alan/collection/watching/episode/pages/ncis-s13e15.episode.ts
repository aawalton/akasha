import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e15 = {
  id: "01a1884b-ef74-7b07-bee8-c2b58f0c5ad7",
  type: "page-type/episode",
  slug: "ncis-s13e15",
  description:
    "When Secretary of the Navy Sarah Porter learns her daughter has been kidnapped, the NCIS team partners with the FBI to track the case, determine a motive and bring her home.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 15,
  publishedAt: "2016-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166247",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/15",
    },
  ],
  title: "React",
  episodeType: "standard",
  stillPath: "/rNIo1JfupDc032tGLTjhN8MFwZS.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
