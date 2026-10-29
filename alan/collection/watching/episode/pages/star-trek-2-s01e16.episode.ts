import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e16 = {
  id: "01a1887f-e187-738a-a58b-c018efe614f6",
  type: "page-type/episode",
  slug: "star-trek-2-s01e16",
  description:
    "Crash landing on a planet populated by hostile giants, the 7-man crew of the shuttlecraft Galileo find themselves unable to communicate with the enterprise or to escape the planet's atmosphere.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 16,
  publishedAt: "1967-01-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13967",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/16",
    },
  ],
  title: "The Galileo Seven",
  episodeType: "standard",
  stillPath: "/2DayPxrcOLq8f2SXiz14JgYRREv.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
