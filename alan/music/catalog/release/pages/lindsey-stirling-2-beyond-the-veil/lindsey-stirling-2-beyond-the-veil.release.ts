import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirling2BeyondTheVeil = {
  id: "01a0676a-d718-7055-86a3-6837c5bcea23",
  type: "release",
  slug: "lindsey-stirling-2-beyond-the-veil",
  title: "Beyond the Veil",
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  ownLength: 4.25125,
  ownProgress: 4.25125,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-04-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kUdsXXw767lPjqeXQmplH",
      externalLink: "https://open.spotify.com/album/1kUdsXXw767lPjqeXQmplH",
    },
  ],
} as const satisfies Release
