import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySomethingJustLikeThisTokyoRemix = {
  id: "01a0676a-d729-705e-981a-578866d3312b",
  type: "page-type/release",
  slug: "coldplay-something-just-like-this-tokyo-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2017-06-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2i3pQGt2uzVfWL8LeFewmI",
      externalLink: "https://open.spotify.com/album/2i3pQGt2uzVfWL8LeFewmI",
    },
  ],
  title: "Something Just Like This (Tokyo Remix)",
} as const satisfies Release
