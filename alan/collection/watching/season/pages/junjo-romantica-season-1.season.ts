import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const junjoRomanticaSeason1 = {
  id: "01a183d6-be6d-7192-904c-82349547417b",
  type: "page-type/season",
  slug: "junjo-romantica-season-1",
  description:
    "Three couples navigate tangled emotions—Misaki and his tutor, a grieving professor and a bold student, and a teen chasing love with his sister’s ex-husband.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/junjo-romantica"],
  position: 1,
  publishedAt: "2008-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "48895",
      externalLink: "https://www.themoviedb.org/tv/37548/season/1",
    },
  ],
  title: "Junjo Romantica Season 1",
  posterPath: "/xkz26fcR3WTe503wkD52etcrGrc.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:47:31.178Z",
  updatedAt: "2026-10-28T18:47:31.178Z",
} as const satisfies Season
