import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e15 = {
  id: "01a1884b-ef68-73dd-aa8d-cecbcf4325b9",
  type: "page-type/episode",
  slug: "ncis-s05e15",
  description:
    "Two members of the NCIS team are sent to Baghdad to investigate a mortar attack that turned into a murder investigation.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 15,
  publishedAt: "2008-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334467",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/15",
    },
  ],
  title: "In the Zone",
  episodeType: "standard",
  stillPath: "/2w6YsPp3UqLD6pjYjZjVOrBM3gB.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
