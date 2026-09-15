import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySomethingJustLikeThisTokyoRemix = {
  id: "01a0676a-d729-705e-981a-578866d3312b",
  type: "page-type/release",
  slug: "coldplay-something-just-like-this-tokyo-remix",
  title: "Something Just Like This (Tokyo Remix)",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 4.549767,
  ownProgress: 4.549767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-06-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2i3pQGt2uzVfWL8LeFewmI",
      externalLink: "https://open.spotify.com/album/2i3pQGt2uzVfWL8LeFewmI",
    },
  ],
} as const satisfies Release
