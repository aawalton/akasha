import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS01e01 = {
  id: "01a1887f-56d1-776d-9b19-725d1fa3c247",
  type: "page-type/episode",
  slug: "scorpion-s01e01",
  description:
    "When a crisis at LAX prevents dozens of airplanes from landing, the government brings in a group of misfit geniuses to sort things out.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/scorpion-season-1"],
  position: 1,
  publishedAt: "2014-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "984494",
      externalLink: "https://www.themoviedb.org/tv/60797/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/qrRFryW2ktF59FMe0WNJfLiy4zP.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
