import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS02e04 = {
  id: "01a1887e-c695-74de-a8ae-99837ad1fcbd",
  type: "page-type/episode",
  slug: "i-am-groot-s02e04",
  description:
    "As an intergalactic ice cream truck approaches, Groot—desperate to get a treat— frantically scours the ship for coins",
  ownLength: 4,
  ownProgress: 4,
  partOfCollections: ["season/i-am-groot-season-2"],
  position: 4,
  publishedAt: "2023-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4629242",
      externalLink: "https://www.themoviedb.org/tv/232125/season/2/episode/4",
    },
  ],
  title: "Groot's Sweet Treat",
  episodeType: "standard",
  stillPath: "/4PSxBL0Muya07GIteMxJhA4A2iB.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
