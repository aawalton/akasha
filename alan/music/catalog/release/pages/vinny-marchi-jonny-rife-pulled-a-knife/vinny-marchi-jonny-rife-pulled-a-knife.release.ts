import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiJonnyRifePulledAKnife = {
  id: "01a0676a-d722-7026-8926-0268ecd1d7df",
  type: "page-type/release",
  slug: "vinny-marchi-jonny-rife-pulled-a-knife",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-10-25",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gS1X2u1gXAD820Arl812p",
      externalLink: "https://open.spotify.com/album/7gS1X2u1gXAD820Arl812p",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Jonny Rife Pulled a Knife",
} as const satisfies Release
