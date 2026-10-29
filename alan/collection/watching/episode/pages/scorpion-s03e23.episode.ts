import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e23 = {
  id: "01a1887f-56d7-79b6-9c73-86d78d5229c8",
  type: "page-type/episode",
  slug: "scorpion-s03e23",
  description:
    "Team Scorpion help Toby and Happy race to the altar to say “I Do” after a simple job extinguishing a tunnel fire becomes catastrophic.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 23,
  publishedAt: "2017-05-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1303159",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/23",
    },
  ],
  title: "Something Burrowed, Something Blew",
  episodeType: "standard",
  stillPath: "/glJoLElDX7HbYf6ldkKp2j6oUWl.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
