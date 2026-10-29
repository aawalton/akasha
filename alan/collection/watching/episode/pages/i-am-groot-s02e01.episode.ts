import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS02e01 = {
  id: "01a1887e-c695-798f-b8ef-9eab1dabca6b",
  type: "page-type/episode",
  slug: "i-am-groot-s02e01",
  description:
    "Groot stumbles across a strange egg in a nest while exploring the alien planet of Terma. He instantly falls for the little creature that emerges when the egg cracks, adopting it as his own.",
  ownLength: 5,
  ownProgress: 5,
  partOfCollections: ["season/i-am-groot-season-2"],
  position: 1,
  publishedAt: "2023-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4629239",
      externalLink: "https://www.themoviedb.org/tv/232125/season/2/episode/1",
    },
  ],
  title: "Are You My Groot?",
  episodeType: "standard",
  stillPath: "/rJelmgL1yTFfH2PhC3LufMhYQko.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
