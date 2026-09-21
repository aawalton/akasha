import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLovelessAndModernLanguage = {
  id: "01a0676a-d724-7006-9941-fb8e85350834",
  type: "page-type/release",
  slug: "vinny-marchi-loveless-and-modern-language",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-03-31",
  rank: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3eflRwbjEpszxBproBfqut",
      externalLink: "https://open.spotify.com/album/3eflRwbjEpszxBproBfqut",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Loveless and Modern Language",
} as const satisfies Release
