import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e22 = {
  id: "01a183d1-bb4b-79d0-a384-552f81712cee",
  type: "page-type/episode",
  slug: "naruto-s01e22",
  description:
    "Rock Lee challenges Sasuke to a one-on-one fight. Naruto grows angry and attacks him, only to be beaten in one attack. Sasuke realizes the challenge and eagerly accepts. But will Sasuke be defeated just as easily by this mysterious ninja? Sasuke's only advantage seems to be his Sharingan, but what happens when not even that will work?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 22,
  publishedAt: "2003-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908147",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/22",
    },
  ],
  title: "Chunin Challenge: Rock Lee vs. Sasuke!",
  episodeType: "standard",
  stillPath: "/2YRIgqJVVAycZ0ZZfIN4GQ169qM.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
