import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS04e01 = {
  id: "01a18859-3c6a-764e-888f-9bd2a723ac9f",
  type: "page-type/episode",
  slug: "torchwood-s04e01",
  description:
    "Convicted child killer Oswald Danes is executed for his crimes and when he miraculously survives his fate a series of events is set in place that forces CIA Agent Rex Matheson to investigate a global event. His investigation leads him from America to Wales and an old defunct British Institute - Torchwood.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/miracle-day"],
  position: 1,
  publishedAt: "2011-07-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21610",
      externalLink: "https://www.themoviedb.org/tv/424/season/4/episode/1",
    },
  ],
  title: "The New World",
  episodeType: "standard",
  stillPath: "/4I5sLjbQBBiafcdbzS1hJNf8HXE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
