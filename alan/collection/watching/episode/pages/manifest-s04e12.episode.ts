import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e12 = {
  id: "01a1884a-400c-72dd-844c-2b7da7b7ca05",
  type: "page-type/episode",
  slug: "manifest-s04e12",
  description:
    "Michaela finds a welcome distraction in helping Jared with an investigation. Cal tests a new ability. Ben and Saanvi try to decode a mysterious message.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 12,
  publishedAt: "2023-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4350224",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/12",
    },
  ],
  title: "Bug Out",
  episodeType: "standard",
  stillPath: "/1Ozah5VhFaFK1Q2nIDN5mpIqlsI.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
