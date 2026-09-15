import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersCopycatKiller = {
  id: "01a0676a-d71b-7027-97c7-d0b7ceb10ba9",
  type: "page-type/release",
  slug: "phoebe-bridgers-copycat-killer",
  title: "Copycat Killer",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 12.8813,
  ownProgress: 12.8813,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EnKDhVbHYKWOjTSQOjpRT",
      externalLink: "https://open.spotify.com/album/7EnKDhVbHYKWOjTSQOjpRT",
    },
  ],
} as const satisfies Release
