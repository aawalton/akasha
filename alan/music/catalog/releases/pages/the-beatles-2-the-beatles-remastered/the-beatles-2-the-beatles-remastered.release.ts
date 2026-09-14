import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2TheBeatlesRemastered = {
  id: "01a0676a-d72c-702f-934c-df71cf09ffe4",
  type: "release",
  slug: "the-beatles-2-the-beatles-remastered",
  title: "The Beatles (Remastered)",
  partOfCollections: ["the-beatles"],
  position: 0,
  ownLength: 93.6936,
  ownProgress: 93.6936,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1968-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1klALx0u4AavZNEvC4LrTL",
      externalLink: "https://open.spotify.com/album/1klALx0u4AavZNEvC4LrTL",
    },
  ],
} as const satisfies Release
