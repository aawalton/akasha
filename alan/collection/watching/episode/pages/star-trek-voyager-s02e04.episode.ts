import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e04 = {
  id: "01a18853-ac8a-7649-87d8-2ff91977b69f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e04",
  description:
    "Stardate: 48921.3. While the crew of Voyager investigate a cluster of space-borne life forms, Kes begins exhibiting strange intense symptoms.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 4,
  publishedAt: "1995-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112970",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/4",
    },
  ],
  title: "Elogium",
  episodeType: "standard",
  stillPath: "/z8QloTTsGUpb6Kkf2rhCvnS6vKO.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
