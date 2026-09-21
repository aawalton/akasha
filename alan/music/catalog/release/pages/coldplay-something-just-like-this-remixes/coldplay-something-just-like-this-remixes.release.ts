import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixes = {
  id: "01a0676a-d729-705d-846c-37069afc6129",
  type: "page-type/release",
  slug: "coldplay-something-just-like-this-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2017-04-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4uRfYhBBaSX8N3amojmMBE",
      externalLink: "https://open.spotify.com/album/4uRfYhBBaSX8N3amojmMBE",
    },
  ],
  title: "Something Just Like This (Remixes)",
} as const satisfies Release
