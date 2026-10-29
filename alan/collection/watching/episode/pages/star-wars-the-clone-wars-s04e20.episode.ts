import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS04e20 = {
  id: "01a18854-50ac-7b99-bdb4-a8dd8dd45da8",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s04e20",
  description:
    "An aimless Asajj Ventress joins a team of bounty hunters under the leadership of young Boba Fett. On an alien world, they undertake a dangerous but profitable mission that tests the limits of their skills, and the strength of Asajj's character.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-4"],
  position: 20,
  publishedAt: "2012-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286685",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/20",
    },
  ],
  title: "Bounty",
  episodeType: "standard",
  stillPath: "/e6Y4C89kFGtS7tZyrESB4FCCHXo.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
