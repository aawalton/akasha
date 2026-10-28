import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const tokyoGhoulSeason1 = {
  id: "01a183d5-860a-79a7-a98d-5d1e91f6100b",
  type: "page-type/season",
  slug: "tokyo-ghoul-season-1",
  description:
    'The suspense horror/dark fantasy story is set in Tokyo, which is haunted by mysterious "ghouls" who are devouring humans. People are gripped by the fear of these ghouls whose identities are masked in mystery. An ordinary college student named Kaneki encounters Rize, a girl who is an avid reader like him, at the café he frequents. Little does he realize that his fate will change overnight.',
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/tokyo-ghoul"],
  position: 1,
  publishedAt: "2014-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "62764",
      externalLink: "https://www.themoviedb.org/tv/61374/season/1",
    },
  ],
  title: "Tokyo Ghoul",
  posterPath: "/aLxFcCflyF7zPDZ65gZvkTfYjw0.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:46:11.206Z",
  updatedAt: "2026-10-28T18:46:11.206Z",
} as const satisfies Season
