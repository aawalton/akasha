import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const jojoSBizarreAdventureS04e03 = {
  id: "01a183d4-462d-7ad2-9bcf-00f2a470db02",
  type: "page-type/episode",
  slug: "jojo-s-bizarre-adventure-s04e03",
  description:
    'Giorno is interviewed by a strange man to enter the Passione gang and achieve his dream of becoming a "Gang-Star".',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/jojo-s-bizarre-adventure-season-4"],
  position: 3,
  publishedAt: "2018-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593091",
      externalLink: "https://www.themoviedb.org/tv/45790/season/4/episode/3",
    },
  ],
  title: "Meet the Gangster Behind the Wall",
  episodeType: "standard",
  stillPath: "/4JY2DLRtU1pQ6msmk7KIhLjEIyH.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Episode
