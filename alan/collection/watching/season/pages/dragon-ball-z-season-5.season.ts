import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason5 = {
  id: "01a183dc-5623-745c-8fb1-b7df4147b79a",
  type: "page-type/season",
  slug: "dragon-ball-z-season-5",
  description:
    "As the battle with the Androids rages on, a fierce evil rises from the shadows: the monster known as Cell. Dr. Gero’s heinous creation is the ultimate weapon, a fighting machine built from the genetic material of the greatest warriors ever to walk the Earth!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 5,
  publishedAt: "1992-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59763",
      externalLink: "https://www.themoviedb.org/tv/12971/season/5",
    },
  ],
  title: "Cell Saga",
  posterPath: "/mA0rQcnMq5HIUeK4haUDJvmDuS2.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
