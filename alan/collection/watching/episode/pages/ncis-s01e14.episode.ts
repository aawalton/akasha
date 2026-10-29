import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e14 = {
  id: "01a1884b-ef62-7cae-a083-fbf26eb7e94b",
  type: "page-type/episode",
  slug: "ncis-s01e14",
  description:
    "A Navy dentist stops near a parked car to help a stranded motorist who pulls out a gun. The team investigate a murder with the help from a local sheriff, Charley, when they find out about the similar murder of the Navy civilian employee.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 14,
  publishedAt: "2004-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334443",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/14",
    },
  ],
  title: "The Good Samaritan",
  episodeType: "standard",
  stillPath: "/hdysX1ucDlu7tjbbXBazVZW2hDo.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
