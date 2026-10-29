import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e03 = {
  id: "01a18855-c29e-7ac4-bdea-2bf43caf82ee",
  type: "page-type/episode",
  slug: "studio-c-s16e03",
  description:
    "A king is bored of the plague. The Duggins start a travel agency. Flight attendants try to go viral",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 3,
  publishedAt: "2022-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839036",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/3",
    },
  ],
  title: "One Measly Spider",
  episodeType: "standard",
  stillPath: "/q0F3EQmBSVGBMrffuiHYJcIdCzN.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
