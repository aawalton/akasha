import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiHeroInYourStory = {
  id: "01a0676a-d720-7032-b8bc-5a1f93fdb981",
  type: "page-type/release",
  slug: "vinny-marchi-hero-in-your-story",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-05-24",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sW4J3kckr7gnsQ1rDWCe0",
      externalLink: "https://open.spotify.com/album/2sW4J3kckr7gnsQ1rDWCe0",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Hero In Your Story",
} as const satisfies Release
