import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS22e07 = {
  id: "01a18855-c2a1-7811-a498-a65a66e09447",
  type: "page-type/episode",
  slug: "studio-c-s22e07",
  description:
    "A man begs his girlfriend not to board a plane. A woman has zero self-awareness at dinner. Nobody dares question the Don, even when no one knows what he's saying. A new indie singer lands a record deal. Steve Harvey hosts Jeopardy.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-22"],
  position: 7,
  publishedAt: "2026-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7070765",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22/episode/7",
    },
  ],
  title: "Don’t Get On That Plane!",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
