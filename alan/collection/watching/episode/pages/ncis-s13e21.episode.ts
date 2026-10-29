import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e21 = {
  id: "01a1884b-ef74-7e63-9bd5-06ca8314a5ce",
  type: "page-type/episode",
  slug: "ncis-s13e21",
  description:
    "Gibbs and Senior FBI Agent T.C. Fornell unite after two British prisoners, including a former spy, escape and arrive stateside via a shipping container.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 21,
  publishedAt: "2016-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187239",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/21",
    },
  ],
  title: "Return to Sender",
  episodeType: "standard",
  stillPath: "/7kWYd2QChCT5pjNIJRpW38DLKWk.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
