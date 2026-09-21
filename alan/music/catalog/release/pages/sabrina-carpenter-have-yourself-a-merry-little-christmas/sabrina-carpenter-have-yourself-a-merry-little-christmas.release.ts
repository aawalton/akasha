import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterHaveYourselfAMerryLittleChristmas = {
  id: "01a0676a-d71f-705d-8d6c-bcfe230affff",
  type: "page-type/release",
  slug: "sabrina-carpenter-have-yourself-a-merry-little-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2017-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78ghmfG83tQUF43coZ6FiH",
      externalLink: "https://open.spotify.com/album/78ghmfG83tQUF43coZ6FiH",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Have Yourself a Merry Little Christmas",
} as const satisfies Release
