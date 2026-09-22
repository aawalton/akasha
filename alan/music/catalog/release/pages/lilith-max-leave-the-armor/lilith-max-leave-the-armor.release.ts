import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxLeaveTheArmor = {
  id: "01a0676a-d722-7068-80a4-c1cfe7857f60",
  type: "page-type/release",
  slug: "lilith-max-leave-the-armor",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2020-08-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5FZk4i5tvBkpVarZdP1hqx",
      externalLink: "https://open.spotify.com/album/5FZk4i5tvBkpVarZdP1hqx",
    },
  ],
  title: "Leave the Armor",
} as const satisfies Release
