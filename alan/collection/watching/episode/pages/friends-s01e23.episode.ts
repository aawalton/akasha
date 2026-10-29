import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e23 = {
  id: "01a18848-c2b9-753f-b284-c8e8fb34dbc8",
  type: "page-type/episode",
  slug: "friends-s01e23",
  description:
    "As Monica's biological clock ticks away like a time bomb, Carol goes into labor. Ross, Susan and Phoebe end up getting locked in a closet just as Carol's about to give birth to the baby. And Rachel flirts with an OB/GYN.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 23,
  publishedAt: "1995-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86092",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/23",
    },
  ],
  title: "The One with the Birth",
  episodeType: "standard",
  stillPath: "/zemqo8BkdOqih3iuqYphPM7bFYc.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
