import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e04 = {
  id: "01a18885-00f9-7209-891f-7314e6ca4a06",
  type: "page-type/episode",
  slug: "studio-c-s02e04",
  description:
    "Good Cop and Bad Cop call in a friend for backup, the Great Kenny has his greatest magic trick yet, and the long-awaited will of Ezekiel Josiah Worthington is read.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 4,
  publishedAt: "2013-04-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383567",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/4",
    },
  ],
  title: "Season 2 Episode 4",
  episodeType: "standard",
  stillPath: "/9vao6iAtR8JBNeUhifeKQULPHsT.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
