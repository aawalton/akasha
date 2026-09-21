import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3RewriteTheStars = {
  id: "01a0676a-d728-7001-99b0-71212dfc4c69",
  type: "page-type/release",
  slug: "the-piano-guys-3-rewrite-the-stars",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2018-02-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7k8jDivkglgkGnDH5gJ7iD",
      externalLink: "https://open.spotify.com/album/7k8jDivkglgkGnDH5gJ7iD",
    },
  ],
  title: "Rewrite the Stars",
} as const satisfies Release
