import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e16 = {
  id: "01a18849-5460-72d1-a9b5-27d5a1f36301",
  type: "page-type/episode",
  slug: "gravity-falls-s02e16",
  description:
    "Grunkle Stan takes the kids with him on a road-trip to sabotage all the other tourist traps in Oregon.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 16,
  publishedAt: "2015-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1105381",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/16",
    },
  ],
  title: "Roadside Attraction",
  episodeType: "standard",
  stillPath: "/2YnzSgkdX4xoJUfM4sTC4JndNLY.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
