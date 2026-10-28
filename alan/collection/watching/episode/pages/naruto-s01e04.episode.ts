import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e04 = {
  id: "01a183d1-bb4a-76fc-87cb-c2a0d77174db",
  type: "page-type/episode",
  slug: "naruto-s01e04",
  description:
    "Now that Naruto, Sasuke, and Sakura are a team, they meet with their sensei, the enigmatic and aloof Kakashi.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 4,
  publishedAt: "2002-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059124",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/4",
    },
  ],
  title: "Pass or Fail: Survival Test",
  episodeType: "standard",
  stillPath: "/754Qrt6RuRblgazi8LiZ26AkmzK.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
