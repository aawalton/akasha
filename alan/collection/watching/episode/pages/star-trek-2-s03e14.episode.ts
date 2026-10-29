import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e14 = {
  id: "01a1887f-e18a-7023-aeb3-a19ac650d374",
  type: "page-type/episode",
  slug: "star-trek-2-s03e14",
  description:
    "Captain Kirk faces off with a demented shape-shifting starship captain determined to control the universe.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 14,
  publishedAt: "1969-01-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14030",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/14",
    },
  ],
  title: "Whom Gods Destroy",
  episodeType: "standard",
  stillPath: "/3UJCq5MwxjaCxZZIhNcniRFVu4m.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
