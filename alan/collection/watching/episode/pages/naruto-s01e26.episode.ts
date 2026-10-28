import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e26 = {
  id: "01a183d1-bb4c-7565-a0df-e7bed208aa18",
  type: "page-type/episode",
  slug: "naruto-s01e26",
  description:
    "Konohamaru, the grandson of Leaf Village's Third Hokage, shows up at the Chunin Exam site. He comes along with Moegi and Udon to cover the events for the Ninja Academy's school newspaper. Konohamaru looks up to Naruto like an older brother and through interviews with the characters, recaps their adventures thus far.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 26,
  publishedAt: "2003-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908151",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/26",
    },
  ],
  title: "Special Report: Live from the Forest of Death!",
  episodeType: "standard",
  stillPath: "/c82OEFZfwvhIYDu4L2Wkiu0AidQ.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
