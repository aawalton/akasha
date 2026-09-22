import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2WhyShouldTheFireDie = {
  id: "01a0676a-d731-7015-8590-87461ab57aeb",
  type: "page-type/release",
  slug: "nickel-creek-2-why-should-the-fire-die",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2005-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6l61p7zbizBUjQWY10LWmb",
      externalLink: "https://open.spotify.com/album/6l61p7zbizBUjQWY10LWmb",
    },
  ],
  title: "Why Should The Fire Die?",
} as const satisfies Release
