import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const thirdRockFromTheSunS03e11 = {
  id: "01a18859-111f-7e9a-ac9f-cfe3e90269ab",
  type: "page-type/episode",
  slug: "third-rock-from-the-sun-s03e11",
  description:
    'Dick decides to "rehabilitate" one of Officer Don\'s prisoners, so he pays his fine and takes him home; Mary decides to give away the dog Dick gave her.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/third-rock-from-the-sun-season-3"],
  position: 11,
  publishedAt: "1997-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "953066",
      externalLink: "https://www.themoviedb.org/tv/155/season/3/episode/11",
    },
  ],
  title: "Jailhouse Dick",
  episodeType: "standard",
  stillPath: "/o4WRooDT0kc1Keq4Zdu1IMtcm1L.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:48:20.891Z",
  updatedAt: "2026-10-29T15:48:20.891Z",
} as const satisfies Episode
