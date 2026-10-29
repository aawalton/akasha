import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS01e03 = {
  id: "01a1887f-adf0-7fff-831e-103ecaefd55f",
  type: "page-type/episode",
  slug: "sherlock-s01e03",
  description:
    "A strange clue in an empty room, a blood-soaked car, a priceless Old Master, a deranged bomber. With the clock ticking, the curtain rises on a battle of wits between Sherlock, John and the shadowy stranger who seems to know all the answers...",
  ownLength: 90,
  ownProgress: 90,
  partOfCollections: ["season/sherlock-season-1"],
  position: 3,
  publishedAt: "2010-08-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578716",
      externalLink: "https://www.themoviedb.org/tv/19885/season/1/episode/3",
    },
  ],
  title: "The Great Game",
  episodeType: "finale",
  stillPath: "/inRnf07LWmlT5Z3KkS4iWlBX48x.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
