import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e04 = {
  id: "01a1887f-e186-76d8-87b3-56eb1ac9946b",
  type: "page-type/episode",
  slug: "star-trek-2-s01e04",
  description:
    "An alien virus strips the enterprise crew of their inhibitions, causing chaos as each crew member is overcome by hidden emotions. Meanwhile, the Enterprise is being pulled inexorably into a nearby planet's gravity well.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-1"],
  position: 4,
  publishedAt: "1966-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13954",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/4",
    },
  ],
  title: "The Naked Time",
  episodeType: "standard",
  stillPath: "/n3McCu6BbRCCcnu8dwU8ipZlO9q.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
