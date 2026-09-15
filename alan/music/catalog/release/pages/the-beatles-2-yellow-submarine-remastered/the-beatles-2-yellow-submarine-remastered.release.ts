import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2YellowSubmarineRemastered = {
  id: "01a0676a-d731-7049-aa87-f7db1e8e06b9",
  type: "release",
  slug: "the-beatles-2-yellow-submarine-remastered",
  title: "Yellow Submarine (Remastered)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 39.718817,
  ownProgress: 39.718817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1969-01-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gKZ5A1ndFqbcrWtW85cCy",
      externalLink: "https://open.spotify.com/album/1gKZ5A1ndFqbcrWtW85cCy",
    },
  ],
} as const satisfies Release
