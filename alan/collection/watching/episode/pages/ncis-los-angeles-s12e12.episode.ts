import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS12e12 = {
  id: "01a1884a-e0f5-7d63-8c78-eb78a658ce67",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s12e12",
  description:
    "After Callen receives a cryptic message from Hetty, he tracks down the person tailing him, bringing him to a remote location teeming with Russians… and face to face with Anna.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-12"],
  position: 12,
  publishedAt: "2021-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2615622",
      externalLink: "https://www.themoviedb.org/tv/17610/season/12/episode/12",
    },
  ],
  title: "Can't Take My Eyes Off You (I)",
  episodeType: "standard",
  stillPath: "/axt2JDJaRUgd7ZlL1dCrBOtqmJR.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
