import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e20 = {
  id: "01a18853-ac8b-7535-8a5d-e04dff03e586",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e20",
  description:
    "Stardate: 49485.2. After weeks of erratic behavior, Tom Paris leaves Voyager and joins a Talaxian convoy.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 20,
  publishedAt: "1996-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113058",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/20",
    },
  ],
  title: "Investigations",
  episodeType: "standard",
  stillPath: "/vnyVNGsxzAlvKXS8igbTmlywNCN.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
