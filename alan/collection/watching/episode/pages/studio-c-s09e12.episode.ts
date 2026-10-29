import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS09e12 = {
  id: "01a18885-00ff-7f0d-941c-1cc29b0b7e9a",
  type: "page-type/episode",
  slug: "studio-c-s09e12",
  description:
    "A blind martial arts master shows off his skills, and Tom Riddle gets ready for the Yule Ball.",
  ownLength: 23,
  ownProgress: 23,
  partOfCollections: ["season/studio-c-season-9"],
  position: 12,
  publishedAt: "2019-02-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1711481",
      externalLink: "https://www.themoviedb.org/tv/68207/season/9/episode/12",
    },
  ],
  title: "Season 9 Episode 12",
  episodeType: "standard",
  stillPath: "/oWppJ9bAKo4mjPhHGTeryq9R8qk.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
