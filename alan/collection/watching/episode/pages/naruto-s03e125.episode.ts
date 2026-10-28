import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e125 = {
  id: "01a183d1-bb53-774f-a46d-6fd6e1f40600",
  type: "page-type/episode",
  slug: "naruto-s03e125",
  description:
    "Down for the count and at the mercy of the Sound Ninja, Kiba, Shikamaru and Rock Lee get help from an unlikely bunch of new allies.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 125,
  publishedAt: "2005-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908102",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/125",
    },
  ],
  title: "The Sand Shinobi: Allies of the Leaf",
  episodeType: "standard",
  stillPath: "/hEeWtOsNcottNiwryPcFO7lGcWP.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
