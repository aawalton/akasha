import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBurnWithVinceStaples = {
  id: "01a0676a-d717-7015-a0de-559d48fbe7e4",
  type: "page-type/release",
  slug: "billie-eilish-burn-with-vince-staples",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-12-15",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6eQpKhYCtvD0TwXQVHsgC2",
      externalLink: "https://open.spotify.com/album/6eQpKhYCtvD0TwXQVHsgC2",
    },
  ],
  title: "&burn (with Vince Staples)",
} as const satisfies Release
