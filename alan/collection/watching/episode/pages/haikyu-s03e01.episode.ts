import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const haikyuS03e01 = {
  id: "01a183d2-cc4a-7a39-8b68-aa84248c8774",
  type: "page-type/episode",
  slug: "haikyu-s03e01",
  description:
    "The Miyagi Prefecture Qualifier finals of the Spring High School Volleyball Tournament. The ones to stand before Karasuno High School are the undefeated champions, Shiratorizawa Academy. Do they have a chance to win against the ultimate spiker, Ushijima? Their battle towards the nationals finally begins...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/haikyu-season-3"],
  position: 1,
  publishedAt: "2016-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1229442",
      externalLink: "https://www.themoviedb.org/tv/60863/season/3/episode/1",
    },
  ],
  title: "Greetings",
  episodeType: "standard",
  stillPath: "/dh7Be0Bif4W0lXVa8cToHIESTsM.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Episode
