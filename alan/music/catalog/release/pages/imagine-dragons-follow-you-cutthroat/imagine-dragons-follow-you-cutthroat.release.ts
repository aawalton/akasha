import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsFollowYouCutthroat = {
  id: "01a0676a-d71e-7021-883d-b88bb4e9d3b2",
  type: "page-type/release",
  slug: "imagine-dragons-follow-you-cutthroat",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2021-03-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1nz0PWfAcTQVbFtpU6u1UY",
      externalLink: "https://open.spotify.com/album/1nz0PWfAcTQVbFtpU6u1UY",
    },
  ],
  title: "Follow You / Cutthroat",
} as const satisfies Release
