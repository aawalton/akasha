import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e07 = {
  id: "01a18855-c29f-77d4-97bd-9b72269db1a6",
  type: "page-type/episode",
  slug: "studio-c-s16e07",
  description: 'A "salesfeller" gets two cowboys to buy his useless wares.',
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 7,
  publishedAt: "2022-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839040",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/7",
    },
  ],
  title: "100% Cement",
  episodeType: "standard",
  stillPath: "/35VpxsZUPPhpzusAan073mi10tw.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
