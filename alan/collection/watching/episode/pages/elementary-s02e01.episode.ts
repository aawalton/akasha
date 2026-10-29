import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS02e01 = {
  id: "01a1887e-62a7-722e-8069-3c24fb7541a1",
  type: "page-type/episode",
  slug: "elementary-s02e01",
  description:
    "Sherlock is called to London to revisit an old case, where he is forced to face his older brother, Mycroft. Although the siblings suffered a drastic falling-out a few years earlier, Mycroft allows Sherlock and Joan to stay in his new home, 221B Baker Street. With Joan in the middle, the brothers are forced to confront their very complicated history.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-2"],
  position: 1,
  publishedAt: "2013-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64310",
      externalLink: "https://www.themoviedb.org/tv/1415/season/2/episode/1",
    },
  ],
  title: "Step Nine",
  episodeType: "standard",
  stillPath: "/2HblMCQOH4UpPAixxRomC4ypqsR.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
