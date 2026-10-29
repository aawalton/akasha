import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const numb3rsS04e01 = {
  id: "01a1887f-0b99-78b6-8b46-7d046db7a52f",
  type: "page-type/episode",
  slug: "numb3rs-s04e01",
  description:
    'After the events of "The Janus List," Colby escapes from custody.  Don and the team go after him, but everything may not be as it seems.',
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/numb3rs-season-4"],
  position: 1,
  publishedAt: "2007-09-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "33434",
      externalLink: "https://www.themoviedb.org/tv/578/season/4/episode/1",
    },
  ],
  title: "Trust Metric",
  episodeType: "standard",
  stillPath: "/xSbr0CrDPVMVK1zNwGB3GeOMjlc.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T16:29:49.843Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Episode
