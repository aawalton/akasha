import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e15 = {
  id: "01a1884b-ef72-70f6-9e3c-b58f5c49f155",
  type: "page-type/episode",
  slug: "ncis-s12e15",
  description:
    "The NCIS team suspects Gibbs' arch-nemesis is behind an explosion at a global terrorism summit.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 15,
  publishedAt: "2015-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041741",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/15",
    },
  ],
  title: "Cabin Fever",
  episodeType: "standard",
  stillPath: "/wUrKguPPmFlbTU26hPHm369Is2W.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
