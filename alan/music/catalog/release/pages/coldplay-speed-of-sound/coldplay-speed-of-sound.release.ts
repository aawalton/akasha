import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySpeedOfSound = {
  id: "01a0676a-d729-7079-9f14-39997794818f",
  type: "page-type/release",
  slug: "coldplay-speed-of-sound",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2005-05-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0rQTtNDDfCYNWijQz3ghQf",
      externalLink: "https://open.spotify.com/album/0rQTtNDDfCYNWijQz3ghQf",
    },
  ],
  title: "Speed of Sound",
} as const satisfies Release
