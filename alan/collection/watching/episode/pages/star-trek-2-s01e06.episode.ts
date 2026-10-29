import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e06 = {
  id: "01a1887f-e186-73bf-9c6e-7c509bafbef9",
  type: "page-type/episode",
  slug: "star-trek-2-s01e06",
  description:
    "Rescuing the crew of a ship from an asteroid belt, the Enterprise plays host to conman extraordinaire, the cunning Harry Mudd and his cargo: three beautiful women looking for suitors.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 6,
  publishedAt: "1966-10-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13958",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/6",
    },
  ],
  title: "Mudd's Women",
  episodeType: "standard",
  stillPath: "/kPv1gXHc6y6KudgLgj5yHkJ0g1Y.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
