import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e08 = {
  id: "01a1887f-e188-76a1-9d56-7ebbd441e802",
  type: "page-type/episode",
  slug: "star-trek-2-s02e08",
  description:
    "Captain Kirk has a second run-in with the conman, Harry Mudd. Mudd is now the supreme ruler of a planet of androids who cater to his every whim.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-2"],
  position: 8,
  publishedAt: "1967-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13989",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/8",
    },
  ],
  title: "I, Mudd",
  episodeType: "standard",
  stillPath: "/7tFljhh3HXKWC4rVVl3Y9xWfdLa.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
