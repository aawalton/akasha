import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsCloneWarsSpecials = {
  id: "01a06802-b8bd-702e-b181-4d5296e1800a",
  type: "page-type/season",
  slug: "star-wars-clone-wars-specials",
  title: "Star Wars: Clone Wars Specials",
  partOfCollections: ["show/clone-wars"],
  position: 0,
  ownLength: 160.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2005-04-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-262044",
      externalLink: "https://trakt.tv/shows/star-wars-clone-wars/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
