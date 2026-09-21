import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynDreamsIForgotAbout = {
  id: "01a0676a-d71c-7039-9feb-bede978e416a",
  type: "page-type/release",
  slug: "chaislyn-dreams-i-forgot-about",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2020-04-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pOhhl3FhhhcmSdK2SZ3xD",
      externalLink: "https://open.spotify.com/album/1pOhhl3FhhhcmSdK2SZ3xD",
    },
  ],
  title: "Dreams I Forgot About",
} as const satisfies Release
