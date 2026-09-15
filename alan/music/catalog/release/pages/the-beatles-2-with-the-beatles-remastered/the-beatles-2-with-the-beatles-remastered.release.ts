import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2WithTheBeatlesRemastered = {
  id: "01a0676a-d731-702d-9bca-29a55faf6e5b",
  type: "release",
  slug: "the-beatles-2-with-the-beatles-remastered",
  title: "With The Beatles (Remastered)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 33.115,
  ownProgress: 33.115,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1963-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aYdiJk6XKeHWGO3FzHHTr",
      externalLink: "https://open.spotify.com/album/1aYdiJk6XKeHWGO3FzHHTr",
    },
  ],
} as const satisfies Release
