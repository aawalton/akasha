import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS05e01 = {
  id: "01a18881-51a2-7291-af38-8f9ecb79e5f0",
  type: "page-type/episode",
  slug: "white-collar-s05e01",
  description:
    "With Peter in prison facing murder charges and every shred of evidence pointing to him for Senator Pratt's untimely death, Neal must strike a deal with the devil to help try and clear Peter's name.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-5"],
  position: 1,
  publishedAt: "2013-10-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596311",
      externalLink: "https://www.themoviedb.org/tv/21510/season/5/episode/1",
    },
  ],
  title: "At What Price",
  episodeType: "standard",
  stillPath: "/99WmkSFiX2oksbtqIfVfyWkR8DP.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
