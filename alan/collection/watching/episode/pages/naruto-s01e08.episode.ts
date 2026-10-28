import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e08 = {
  id: "01a183d1-bb4a-7bc1-9a1f-5e6d94617dff",
  type: "page-type/episode",
  slug: "naruto-s01e08",
  description:
    "With Kakashi captured, Naruto, Sasuke and Sakura must defend against Zabuza's attacks. Naruto realizes that working together with Sasuke may be the only way to save Kakashi. Will the combined effort of the two be enough to free Kakashi and defeat Zabuza?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 8,
  publishedAt: "2002-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059128",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/8",
    },
  ],
  title: "The Oath of Pain",
  episodeType: "standard",
  stillPath: "/aHB9h0MKT9SM56QDpFEAThWmfZw.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
