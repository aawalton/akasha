import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynMrNiceTry = {
  id: "01a0676a-d725-7011-826e-76bae34246cd",
  type: "page-type/release",
  slug: "chaislyn-mr-nice-try",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2024-09-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kl9UuLfB181aBGBbpqwmB",
      externalLink: "https://open.spotify.com/album/6kl9UuLfB181aBGBbpqwmB",
    },
  ],
  title: "Mr. Nice Try",
} as const satisfies Release
