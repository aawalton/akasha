import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const avatarTheLastAirbenderSpecials = {
  id: "01a06802-b8b7-7013-a4a0-70e00dcd4660",
  type: "page-type/season",
  slug: "avatar-the-last-airbender-specials",
  title: "Avatar: The Last Airbender Specials",
  partOfCollections: ["show/avatar-the-last-airbender"],
  position: 0,
  ownLength: 430.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2002-04-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-892",
      externalLink: "https://trakt.tv/shows/avatar-the-last-airbender/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
