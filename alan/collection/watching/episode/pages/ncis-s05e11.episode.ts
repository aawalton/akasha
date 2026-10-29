import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e11 = {
  id: "01a1884b-ef68-7108-8011-d32732ba560b",
  type: "page-type/episode",
  slug: "ncis-s05e11",
  description:
    "After a young Muslim Marine is murdered near his Mosque, Ducky refuses to perform an autopsy due to his religious beliefs. The NCIS team try to talk to the father of the deceased, and they send McGee to plant a bug in the Mosque, only to discover that the FBI already planted their own bug.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 11,
  publishedAt: "2008-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334463",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/11",
    },
  ],
  title: "Tribes",
  episodeType: "standard",
  stillPath: "/51I6lDKZdyQr5JhOSz25JciwxK7.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
