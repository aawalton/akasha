import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e24 = {
  id: "01a18853-ac8d-7749-bd60-cb63deb66f30",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e24",
  description:
    "Stardate: 50912.4. Crew members are replaced one-by-one with aliens from an unknown race.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 24,
  publishedAt: "1997-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113154",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/24",
    },
  ],
  title: "Displaced",
  episodeType: "standard",
  stillPath: "/ypI6Fr8CFETQlFfhZf7Qh23DWBE.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
