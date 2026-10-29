import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e10 = {
  id: "01a1887f-56d6-7c98-a083-098b0b08134b",
  type: "page-type/episode",
  slug: "scorpion-s03e10",
  description:
    "Walter must swim through the deadly La Brea Tar Pits when Team Scorpion helps a woman trapped in the tar before she runs out of oxygen.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 10,
  publishedAt: "2016-12-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1243311",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/10",
    },
  ],
  title: "This is the Pits",
  episodeType: "standard",
  stillPath: "/a8ZwlIqg4L6PbyhPd7XW4bpLx7s.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
