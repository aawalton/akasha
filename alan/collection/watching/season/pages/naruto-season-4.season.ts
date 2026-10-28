import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoSeason4 = {
  id: "01a183d1-bb62-76a7-96b6-4ff0333f809f",
  type: "page-type/season",
  slug: "naruto-season-4",
  description:
    "In the Village Hidden in the Leaves, there are few things Naruto and Choji love more than a steaming bowl of Ichiraku ramen, and when the daughter of the owner is kidnapped, they're on the case. Then, missions for the Leaf ninja lead them to the Land of Bears after a fallen meteorite and the Land of Greens to protect a princess. When an evil ninja who's after the princess gets in their way, it's Naruto's life on the line!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54564",
      externalLink: "https://www.themoviedb.org/tv/46260/season/4",
    },
  ],
  title: "Naruto Season 4",
  posterPath: "/jN77xxkOJG0dWMQZPu7KHzPFQoZ.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Season
