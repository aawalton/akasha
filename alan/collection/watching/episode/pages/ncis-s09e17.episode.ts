import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e17 = {
  id: "01a1884b-ef6e-7260-88b6-ce94dea80c7b",
  type: "page-type/episode",
  slug: "ncis-s09e17",
  description:
    "Top-secret clearance from a Naval research laboratory is jeopardized when the murder of a Chief Petty Officer is connected to an international arms dealer.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 17,
  publishedAt: "2012-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334605",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/17",
    },
  ],
  title: "Need to Know",
  episodeType: "standard",
  stillPath: "/mnnPfnnP5SSqAlHWJnVTzf2rS34.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
