import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2SpanishLady20thAnniversary = {
  id: "01a0676a-d729-7072-ad7d-a3e6fa02a381",
  type: "page-type/release",
  slug: "celtic-woman-2-spanish-lady-20th-anniversary",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2025-06-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6peF96JCYG7LBbh0HaovLS",
      externalLink: "https://open.spotify.com/album/6peF96JCYG7LBbh0HaovLS",
    },
  ],
  title: "Spanish Lady (20th Anniversary)",
} as const satisfies Release
