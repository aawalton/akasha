import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e06 = {
  id: "01a18885-00fb-7a24-9b07-8aaa0d725f72",
  type: "page-type/episode",
  slug: "studio-c-s05e06",
  description:
    "Ken Burns uncovers the true story of Lewis and Clark's expedition, and there is love in the air at the local ice cream parlor.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 6,
  publishedAt: "2014-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574662",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/6",
    },
  ],
  title: "Season 5 Episode 6",
  episodeType: "standard",
  stillPath: "/elhQfm7TkcCO4GUladQBGS4uZa2.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
