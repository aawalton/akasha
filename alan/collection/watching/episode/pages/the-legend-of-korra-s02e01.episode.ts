import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS02e01 = {
  id: "01a18857-4fe4-7d42-9bb1-0b2bf060e54e",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s02e01",
  description:
    "Korra struggles to find a deeper connection with the Spirit World as she and the gang attend a Southern Water Tribe festival.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-two-spirits"],
  position: 1,
  publishedAt: "2013-09-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779572",
      externalLink: "https://www.themoviedb.org/tv/33880/season/2/episode/1",
    },
  ],
  title: "Rebel Spirit",
  episodeType: "standard",
  stillPath: "/deLGV202U8erTPTvyXaqyLQKcD5.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
