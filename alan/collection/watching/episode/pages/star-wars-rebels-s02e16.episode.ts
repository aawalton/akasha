import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e16 = {
  id: "01a18853-ddfd-7819-8f57-cef6fbd8ef2b",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e16",
  description:
    "Kanan, Ezra, and Ahsoka return to the Jedi Temple on Lothal, seeking answers from Yoda about the Inquisitors’ ability to continually track the rebels.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 16,
  publishedAt: "2016-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1173281",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/16",
    },
  ],
  title: "Shroud of Darkness",
  episodeType: "standard",
  stillPath: "/iCE44rUGQL5p2gvH9Q7mk5RnQrJ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
