import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e20 = {
  id: "01a18852-d430-731c-bd4a-14ae0eed2361",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e20",
  description:
    "While exploring a crashed vessel on a desolate planet, the Enterprise crew is haunted by some ghostly figures, and they encounter an alien race that has survived despite insurmountable odds. Trip helps repair their derelict vessel and is befriended by Liana, an attractive humanoid alien who develops feelings for him.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 20,
  publishedAt: "2002-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15555",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/20",
    },
  ],
  title: "Oasis",
  episodeType: "standard",
  stillPath: "/m3WOV48SxaviDEj8tIYaoPlA1DI.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
