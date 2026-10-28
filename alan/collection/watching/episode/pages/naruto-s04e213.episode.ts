import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS04e213 = {
  id: "01a183d1-bb61-7ef1-8884-4e1a746b7b06",
  type: "page-type/episode",
  slug: "naruto-s04e213",
  description:
    "Naruto rescues a kid who was injured but he is an outsider to Konoha. Tsunade assigns Naruto to take care of the kid until he gets his memory back. What was this kid doing outside of Konoha and why can't he remember anything?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-4"],
  position: 213,
  publishedAt: "2006-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1161630",
      externalLink: "https://www.themoviedb.org/tv/46260/season/4/episode/213",
    },
  ],
  title: "Vanished Memories",
  episodeType: "standard",
  stillPath: "/iuuMJpCC450j7GJd5zaF8h5c7TV.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
