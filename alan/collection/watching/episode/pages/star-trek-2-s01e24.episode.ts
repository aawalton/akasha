import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e24 = {
  id: "01a1887f-e187-7434-bc85-c037638dc998",
  type: "page-type/episode",
  slug: "star-trek-2-s01e24",
  description:
    "The Enterprise crew try to rescue colonists from deadly radiation, but instead encounter strange alien spores that seem to offer paradise.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 24,
  publishedAt: "1967-03-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13977",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/24",
    },
  ],
  title: "This Side of Paradise",
  episodeType: "standard",
  stillPath: "/fVOOf0wDye4KLPvMTOiEn7mWm0E.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
