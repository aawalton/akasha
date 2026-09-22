import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxCallDownTheDragon = {
  id: "01a0676a-d719-7052-b073-396d1a96fd32",
  type: "page-type/release",
  slug: "lilith-max-call-down-the-dragon",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2025-05-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4lum6B64jvLqt9wZMDfi3f",
      externalLink: "https://open.spotify.com/album/4lum6B64jvLqt9wZMDfi3f",
    },
  ],
  title: "Call Down the Dragon",
} as const satisfies Release
