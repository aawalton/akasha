import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e19 = {
  id: "01a183d1-bb4b-7bd6-a02c-4c5a575d62ad",
  type: "page-type/episode",
  slug: "naruto-s01e19",
  description:
    "Thinking of Haku, Naruto angrily confronts Zabuza, but he learns that cruel reality is the fate of a ninja.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 19,
  publishedAt: "2003-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908144",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/19",
    },
  ],
  title: "The Demon in the Snow",
  episodeType: "standard",
  stillPath: "/vEo04e0vR3tySztQoLVgrBpiVIa.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
