import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2HelpRemastered = {
  id: "01a0676a-d720-702b-8b79-0216fa42badd",
  type: "release",
  slug: "the-beatles-2-help-remastered",
  title: "Help! (Remastered)",
  partOfCollections: ["the-beatles"],
  position: 0,
  ownLength: 33.917017,
  ownProgress: 33.917017,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1965-08-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0PT5m6hwPRrpBwIHVnvbFX",
      externalLink: "https://open.spotify.com/album/0PT5m6hwPRrpBwIHVnvbFX",
    },
  ],
} as const satisfies Release
