import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsILoveYouAllTheTimePlayItForwardCampaign = {
  id: "01a0676a-d721-702c-b6ca-88d60295aeb2",
  type: "page-type/release",
  slug: "imagine-dragons-i-love-you-all-the-time-play-it-forward-campaign",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-12-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6PaHnwGDIqzWqz1e09uRMK",
      externalLink: "https://open.spotify.com/album/6PaHnwGDIqzWqz1e09uRMK",
    },
  ],
  title: "I Love You All the Time (Play It Forward Campaign)",
} as const satisfies Release
