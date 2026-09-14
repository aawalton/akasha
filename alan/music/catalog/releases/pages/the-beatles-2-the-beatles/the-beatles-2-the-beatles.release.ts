import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2TheBeatles = {
  id: "01a0676a-d72c-702a-86b8-3dadf95b1959",
  type: "release",
  slug: "the-beatles-2-the-beatles",
  title: "The Beatles",
  partOfCollections: ["the-beatles"],
  position: 0,
  ownLength: 327.317133,
  ownProgress: 327.317133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WMVvswNzB9i2UMh9svso5",
      externalLink: "https://open.spotify.com/album/1WMVvswNzB9i2UMh9svso5",
    },
  ],
} as const satisfies Release
