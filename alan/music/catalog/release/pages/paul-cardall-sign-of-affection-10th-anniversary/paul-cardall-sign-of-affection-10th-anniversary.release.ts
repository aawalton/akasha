import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSignOfAffection10thAnniversary = {
  id: "01a0676a-d729-7005-b0fd-2e1d8e70acb1",
  type: "page-type/release",
  slug: "paul-cardall-sign-of-affection-10th-anniversary",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2006-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VSh7aoAeo35kOZ9xu6EOO",
      externalLink: "https://open.spotify.com/album/6VSh7aoAeo35kOZ9xu6EOO",
    },
  ],
  title: "Sign of Affection (10th Anniversary)",
} as const satisfies Release
