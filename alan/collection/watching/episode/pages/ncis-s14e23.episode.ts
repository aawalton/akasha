import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e23 = {
  id: "01a1884b-ef76-7d17-815d-7737852c0542",
  type: "page-type/episode",
  slug: "ncis-s14e23",
  description:
    "The team suspects foul play when a healthy, young Petty Officer mysteriously dies in his sleep aboard a Navy destroyer.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 23,
  publishedAt: "2017-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310648",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/23",
    },
  ],
  title: "Something Blue",
  episodeType: "standard",
  stillPath: "/p30PD2B0aXGmitpabjpGOffOH2S.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
