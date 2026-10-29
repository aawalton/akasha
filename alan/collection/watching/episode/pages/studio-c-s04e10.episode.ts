import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e10 = {
  id: "01a18885-00fb-70dd-ad6d-6f9d046be223",
  type: "page-type/episode",
  slug: "studio-c-s04e10",
  description:
    "The president gives his most motivational pep talk, the Brothers Grimm try to tell the commoners their latest story, and Studio C ends the season with a fond farewell.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-4"],
  position: 10,
  publishedAt: "2014-06-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721796",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/10",
    },
  ],
  title: "Season 4 Episode 10",
  episodeType: "standard",
  stillPath: "/fJ2WakE73dduJ8UukA5EaWJkZqW.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
