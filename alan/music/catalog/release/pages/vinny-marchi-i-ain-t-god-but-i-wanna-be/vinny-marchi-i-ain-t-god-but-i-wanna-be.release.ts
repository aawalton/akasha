import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiIAinTGodButIWannaBe = {
  id: "01a0676a-d721-7000-8ad5-cf946b8b5305",
  type: "page-type/release",
  slug: "vinny-marchi-i-ain-t-god-but-i-wanna-be",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-05-02",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qIoFsbYhOLRZ3aIljy0PR",
      externalLink: "https://open.spotify.com/album/2qIoFsbYhOLRZ3aIljy0PR",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "I Ain't God But I Wanna Be",
} as const satisfies Release
