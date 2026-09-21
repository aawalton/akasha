import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayGhostStoriesLive2014 = {
  id: "01a0676a-d71e-705b-aab6-109bd7ae0f17",
  type: "page-type/release",
  slug: "coldplay-ghost-stories-live-2014",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-11-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hNS0RsxPTFjmKXCgmjSLS",
      externalLink: "https://open.spotify.com/album/1hNS0RsxPTFjmKXCgmjSLS",
    },
  ],
  title: "Ghost Stories Live 2014",
} as const satisfies Release
