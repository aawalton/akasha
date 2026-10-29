import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e15 = {
  id: "01a1887f-e187-74e9-9ad9-05af7f91c6a3",
  type: "page-type/episode",
  slug: "star-trek-2-s01e15",
  description:
    "When McCoy sees the White Rabbit from Alice in Wonderland, the crew begins to realize that the planet they are visiting seems to have the dangerous power to turn any thought into reality.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 15,
  publishedAt: "1966-12-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13966",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/15",
    },
  ],
  title: "Shore Leave",
  episodeType: "standard",
  stillPath: "/idgV7eLs5PxRalrUO3gIdXuvzUt.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
