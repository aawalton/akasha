import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e11 = {
  id: "01a1884b-6702-7102-8c10-5bfff0a40a0f",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e11",
  description:
    "The team investigates the suspicious death of a U.S. Naval officer who’d just learned he was going to be a father, leading to the discovery of a scandalous secret.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 11,
  publishedAt: "2026-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7026711",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/11",
    },
  ],
  title: "Berthed",
  episodeType: "standard",
  stillPath: "/ibRpgltHgdSVvdMLS0pmQ4grKg9.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
