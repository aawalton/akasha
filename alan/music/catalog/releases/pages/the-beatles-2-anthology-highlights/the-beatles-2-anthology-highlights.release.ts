import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2AnthologyHighlights = {
  id: "01a0676a-d717-7024-b4f7-2c525e133915",
  type: "release",
  slug: "the-beatles-2-anthology-highlights",
  title: "Anthology Highlights",
  partOfCollections: ["the-beatles"],
  position: 0,
  ownLength: 91.016517,
  ownProgress: 91.016517,
  unit: "minutes",
  status: "completed",
  publishedAt: "2025-08-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IAahIqSj6C8JvAuNeV5UG",
      externalLink: "https://open.spotify.com/album/7IAahIqSj6C8JvAuNeV5UG",
    },
  ],
} as const satisfies Release
