import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS22e05 = {
  id: "01a18855-c2a1-771e-80ab-07ce70e34505",
  type: "page-type/episode",
  slug: "studio-c-s22e05",
  description:
    "A confusing customer holds up the Burger Barn line. A birthday cake hides a disturbing surprise. Draco dreams of serving Voldemort. A eulogy has to be improvised from a grocery list. A hot dog loving co-worker creates chaos.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-22"],
  position: 5,
  publishedAt: "2026-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7070763",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22/episode/5",
    },
  ],
  title: "It Smells Like Hotdog Water",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
