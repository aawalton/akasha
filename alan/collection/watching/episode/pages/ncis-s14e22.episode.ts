import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e22 = {
  id: "01a1884b-ef75-775b-90a2-0e0e9cc4d275",
  type: "page-type/episode",
  slug: "ncis-s14e22",
  description:
    "A Gunnery Sergeant's murder in a national park leads the team to join forces with the mounted police. While investigating the clues, they uncover a disturbing smuggling ring.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 22,
  publishedAt: "2017-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1302045",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/22",
    },
  ],
  title: "Beastmaster",
  episodeType: "standard",
  stillPath: "/gUeTz15Y6FbEUaBLBTb1R6thDbI.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
