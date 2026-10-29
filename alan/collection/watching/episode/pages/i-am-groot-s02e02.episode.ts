import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS02e02 = {
  id: "01a1887e-c695-7898-b649-65ff764f3459",
  type: "page-type/episode",
  slug: "i-am-groot-s02e02",
  description:
    "When Groot discovers a bionic nose-shaped device that grants him a sense of smell, he quickly learns not to stick his new nose where it doesn't belong.",
  ownLength: 4,
  ownProgress: 4,
  partOfCollections: ["season/i-am-groot-season-2"],
  position: 2,
  publishedAt: "2023-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4629240",
      externalLink: "https://www.themoviedb.org/tv/232125/season/2/episode/2",
    },
  ],
  title: "Groot Noses Around",
  episodeType: "standard",
  stillPath: "/bf39ykfbUodisUirJXcUbI8bRFe.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
